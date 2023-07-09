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
        
        queryset = super().get_queryset()
        request_query = self.request.GET

        min_lat = request_query.get('min_lat')

        max_lat = request_query.get('max_lat')

        min_lng = request_query.get('min_lng')
        max_lng = request_query.get('max_lng')


        print(min_lat, max_lat, min_lng, max_lng)
        filtered_queryset = queryset.filter(Q(latitude__range=(min_lat, max_lat)) &
                                            Q(longitude__range=(min_lng, max_lng)) &
                                            Q(status=1))
        return filtered_queryset
    


class FilteredOrderOperationsMixin(OrderOperationsMixin):

    def get_queryset(self):
        
        queryset = super().get_queryset()
        
        request_query = self.request.GET
        print(request_query)
        user_id = request_query.get('user_id')

        print(user_id)
        filtered_queryset = queryset.filter(supplier=user_id)
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
