from .models import User, Address, Supplier, Collector, TypeOfGoods, Order, RecyclePoint
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name','last_name','email','password']
        extra_kwargs = {
            'password':{'write_only': True}
        # this is to make password entry unvisible to others
        }

    def create (self, validated_data):
        #in this function we override adding password as a plane text
        # we extract password from valideated data dict and replace it with
        # hashed passowrd using django built-in set_password function
        # then we use udpated instance of User to update db (.save)
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
        model =RecyclePoint
        fields = '__all__'
