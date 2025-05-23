from django.test import TestCase

# Create your tests here.
from rest_framework.test import APITestCase
from django.urls import reverse

class UserRegistrationTest(APITestCase):
    def test_user_registration_success(self):
        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "Testpass1234"
        }
        response = self.client.post(reverse('register'), data)
        self.assertEqual(response.status_code, 201)
        self.assertIn('id', response.data)
