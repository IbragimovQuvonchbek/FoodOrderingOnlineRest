from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, MenuItemViewSet, CartItemViewSet,
    OrderViewSet, OrderItemViewSet, RegisterView,
    current_user  # Add this import
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'menu-items', MenuItemViewSet, basename='menuitem')
router.register(r'cart-items', CartItemViewSet, basename='cartitem')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'order-items', OrderItemViewSet, basename='orderitem')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('user/me/', current_user, name='current-user'),  # Add this line
]