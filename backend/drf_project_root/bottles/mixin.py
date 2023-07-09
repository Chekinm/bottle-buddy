# from rest_framework import mixins
from django.db.models import Q
from .models import (User, Rating, Order,
                     TypeOfGoods, RecyclePoint,
                     )
from .serializers import (UserSerializer, RatingSerializer,
                          OrderSerializer, TypeOfGoodsSerializer,
                          RecyclePointSerializer,
                          )
from rest_framework.mixins import (CreateModelMixin, ListModelMixin,
                                   RetrieveModelMixin,
                                   UpdateModelMixin, DestroyModelMixin)


class UserOperationsMixin (ListModelMixin,
                           CreateModelMixin,
                           RetrieveModelMixin,
                           UpdateModelMixin,
                           DestroyModelMixin,
                           ):

    queryset = User.objects.all()
    serializer_class = UserSerializer


class RatingOperationsMixin (ListModelMixin,
                             CreateModelMixin,
                             RetrieveModelMixin,
                             UpdateModelMixin,
                             ):

    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class OrderOperationsMixin (ListModelMixin,
                            CreateModelMixin,
                            RetrieveModelMixin,
                            UpdateModelMixin):
    def post(self, request):
        print(self.request)
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class FilteredOrderOperationsMixin(OrderOperationsMixin):
    
    def get_queryset(self):
        # Apply your filtering logic here
        queryset = super().get_queryset()
        # Filter the queryset as needed
        filtered_queryset = queryset.filter(Q(latitude__range=(0, 35)) &
                                            Q(longitude__range=(0, 35)) &
                                            Q(status=1))
        return filtered_queryset


class TypeOfGoodsOperationsMixin (ListModelMixin,
                                  CreateModelMixin,
                                  RetrieveModelMixin,
                                  UpdateModelMixin,
                                  ):

    queryset = TypeOfGoods.objects.all()
    serializer_class = TypeOfGoodsSerializer


class RecyclePointOperationsMixin (ListModelMixin,
                                   CreateModelMixin,
                                   RetrieveModelMixin,
                                   UpdateModelMixin,
                                   ):

    queryset = RecyclePoint.objects.all()
    serializer_class = RecyclePointSerializer
