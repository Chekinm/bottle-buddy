from rest_framework import mixins
from .models import User, Supplier, Collector, Order, TypeOfGoods, RecyclePoint, Address
from .serializers import UserSerializer, SupplierSerializer, CollectorSerializer, OrderSerializer
from .serializers import TypeOfGoodsSerializer, RecyclePointSerializer, AddressSerializer

from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin

class UserOperationsMixin (ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset =  User.objects.all()
    serializer_class = UserSerializer
    

class SupplierOperationsMixin (ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset =  Supplier.objects.all()
    serializer_class = SupplierSerializer

class CollectorOperationsMixin (ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset =  Collector.objects.all()
    serializer_class = CollectorSerializer

class OrderOperationsMixin (ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset =  Order.objects.all()
    serializer_class = OrderSerializer

class TypeOfGoodsOperationsMixin (ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset =  TypeOfGoods.objects.all()
    serializer_class = TypeOfGoodsSerializer

class RecyclePointOperationsMixin (ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset =  RecyclePoint.objects.all()
    serializer_class = RecyclePointSerializer

class AddressOperationsMixin (ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin):
    queryset =  Address.objects.all()
    serializer_class = AddressSerializer

