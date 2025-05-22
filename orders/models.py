from django.db import models
from django.contrib.auth.models import AbstractUser

# Custom User model with roles
class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('customer', 'Customer'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')

    def __str__(self):
        return f"{self.username} ({self.role})"


# Menu items for sale
class MenuItem(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=6)
    image = models.URLField(blank=True)

    def __str__(self):
        return self.title


# CartItem model (one menu item + quantity per user cart)
class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('user', 'menu_item')  # Optional: prevent duplicate items for same user

    def __str__(self):
        return f"{self.quantity} x {self.menu_item.title} in {self.user.username}'s cart"


# Order status choices
STATUS_CHOICES = [
    ('Pending', 'Pending'),
    ('Submitted', 'Submitted'),
    ('Completed', 'Completed'),
    ('Cancelled', 'Cancelled'),
]


# Order model
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    customer_email = models.EmailField(blank=True, null=True)
    delivery_address = models.TextField(blank=True, null=True)
    delivery_lat = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    delivery_lng = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def total_price(self):
        return sum(item.menu_item.price * item.quantity for item in self.orderitem_set.all())

    def __str__(self):
        return f"Order #{self.id} by {self.user.username if self.user else 'Guest'}"


# Items in an order
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.menu_item.title}"
