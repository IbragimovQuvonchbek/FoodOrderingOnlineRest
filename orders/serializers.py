from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, MenuItem, CartItem, Order, OrderItem

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)  # confirmation

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password2')
        extra_kwargs = {'email': {'required': True}}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']
        read_only_fields = ['role']


class MenuItemSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=6, decimal_places=2, coerce_to_string=False)

    class Meta:
        model = MenuItem
        fields = ['id', 'title', 'description', 'price', 'image']


class CartItemSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer(read_only=True)
    menu_item_id = serializers.IntegerField(write_only=True)  # Changed from PrimaryKeyRelatedField

    class Meta:
        model = CartItem
        fields = ['id', 'menu_item', 'menu_item_id', 'quantity']
        extra_kwargs = {
            'quantity': {'required': True},
            'menu_item_id': {'required': True}
        }

    def create(self, validated_data):
        # Get the current user from the context
        user = self.context['request'].user
        # Create the cart item
        cart_item = CartItem.objects.create(
            user=user,
            menu_item_id=validated_data['menu_item_id'],
            quantity=validated_data['quantity']
        )
        return cart_item


class OrderItemSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer(read_only=True)
    menu_item_id = serializers.PrimaryKeyRelatedField(
        queryset=MenuItem.objects.all(), source='menu_item', write_only=True
    )

    class Meta:
        model = OrderItem
        fields = ['id', 'menu_item', 'menu_item_id', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(source='orderitem_set', many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'customer_email', 'delivery_address',
            'delivery_lat', 'delivery_lng', 'status', 'created_at',
            'items', 'total_price'
        ]
        read_only_fields = ['user', 'status', 'created_at', 'total_price']

    def get_total_price(self, obj):
        return sum(item.menu_item.price * item.quantity for item in obj.orderitem_set.all())

    def create(self, validated_data):
        user = self.context['request'].user
        order = Order.objects.create(user=user, **validated_data)

        # Get all cart items for the user
        cart_items = CartItem.objects.filter(user=user)

        # Create order items from cart items
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                menu_item=cart_item.menu_item,
                quantity=cart_item.quantity
            )
            # Remove the item from cart
            cart_item.delete()

        return order

    def get_total_price(self, obj):
        return obj.total_price()
