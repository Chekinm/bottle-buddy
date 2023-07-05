from .models import (User, Address, Supplier, Collector,
                     TypeOfGoods, Order, RecyclePoint)
from rest_framework import serializers


from rest_framework_simplejwt.serializers import (TokenObtainPairSerializer,
                                                  TokenRefreshSerializer,
                                                  TokenBlacklistSerializer,
                                                  )
from rest_framework_simplejwt.exceptions import InvalidToken


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """custom serializer add user e-mail and user name to fronend in access token"""
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['id'] = user.id
        return token

    def validate(self, attrs):
        """customized validate function to extend
        authentication response with user info"""
        attrs = super().validate(attrs)
        return {
            "first_name": self.user.first_name,
            "last_name": self.user.last_name,
            "user_id": self.user.id,
            "email": self.user.email,
            # "permissions": self.user.user_permissions.values_list("codename", flat=True),
            # "groups": self.user.groups.values_list("name", flat=True),
            **attrs,
        }


class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    """modified TokenRefreshSerializer class to get refresh_roken from request
    cookies and validate it"""
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        if attrs['refresh']:
            
            return super().validate(attrs)
        else:
            raise InvalidToken(
                'No valid token found in cookie \'refresh_token\''
                )


class CookieTokenBlackListSerializer(TokenBlacklistSerializer):
    """modified TokenBlackLIstSerializer class to get refresh_roken from request
    cookies and validate it and blacklist it"""
    refresh = None

    def validate(self, attrs):
        print('we are in black list serializer', attrs)
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        if attrs['refresh']:
            # parents validate will validate and blacklist our token
            return super().validate(attrs)
        else:
            raise InvalidToken(
                'No valid token found in cookie \'refresh_token\''
                )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
            # this is to make password entry unvisible to others
        }

    def create(self, validated_data):
        """in this function we override adding password as a plane text
        we extract password from valideated data dict and replace it with
        hashed passowrd using django built-in set_password function
        then we use udpated instance of User to update db (.save)"""

        password = validated_data.pop('password', None)
        isinstance = self.Meta.model(**validated_data)
        if password is not None:
            isinstance.set_password(password)
        isinstance.save()
        return isinstance


class AddressSerializer (serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = '__all__'


class SupplierSerializer (serializers.ModelSerializer):

    class Meta:
        model = Supplier
        fields = '__all__'


class CollectorSerializer (serializers.ModelSerializer):

    class Meta:
        model = Collector
        fields = '__all__'


class OrderSerializer (serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = '__all__'


class TypeOfGoodsSerializer (serializers.ModelSerializer):

    class Meta:
        model = TypeOfGoods
        fields = '__all__'


class RecyclePointSerializer (serializers.ModelSerializer):

    class Meta:
        model = RecyclePoint
        fields = '__all__'
