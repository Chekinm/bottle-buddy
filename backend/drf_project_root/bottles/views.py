from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView,
                                            TokenVerifyView,
                                            )
from rest_framework_simplejwt.tokens import RefreshToken
from .auth import CookieJWTAuthentication

from rest_framework.permissions import (IsAuthenticated,
                                        AllowAny,
                                        )
# from rest_framework.status import (HTTP_200_OK,
#                                    HTTP_201_CREATED,
#                                    HTTP_400_BAD_REQUEST,
#                                    HTTP_202_ACCEPTED,
#                                    HTTP_403_FORBIDDEN,
#                                    )
# from rest_framework.filters import (BaseFilterBackend,
#                                     SearchFilter,
#                                     OrderingFilter,
#                                     )
# # from .models import (User,
#                      Supplier,
#                      Collector,
#                      Order,
#                      TypeOfGoods,
#                      RecyclePoint,
#                      Address,
#                      )

from .mixin import (UserOperationsMixin,
                    SupplierOperationsMixin,
                    CollectorOperationsMixin,
                    OrderOperationsMixin,
                    TypeOfGoodsOperationsMixin,
                    RecyclePointOperationsMixin,
                    AddressOperationsMixin,
                    )


class CreateUserAPI (UserOperationsMixin, GenericAPIView):
    authentication_classes = []
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ListUserAPI (UserOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication, ]
    permission_classes = (IsAuthenticated, )
    pass


class SupplierAPI(SupplierOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication, ]
    permission_classes = (IsAuthenticated,)
    pass


class CollectorAPI(CollectorOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication, ]
    permission_classes = (IsAuthenticated,)
    pass


class OrderAPI(OrderOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication, ]
    permission_classes = (IsAuthenticated,)
    pass


class TypeOfGoodsAPI(TypeOfGoodsOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication, ]
    permission_classes = (IsAuthenticated,)
    pass


class RecyclePointAPI(RecyclePointOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication, ]
    permission_classes = (IsAuthenticated,)
    pass


class AddressAPI(AddressOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication, ]
    permission_classes = (IsAuthenticated,)


# Token autorzaion API

class CookieTokenObtainPairView(TokenObtainPairView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('access'):
            response.set_cookie('access_token',
                                response.data['access'],
                                samesite='None',
                                secure=True,
                                httponly=True,
                                )
            response.set_cookie('refresh_token',
                                response.data['refresh'],
                                samesite='None',
                                secure=True,
                                httponly=True,
                                )
            del response.data['access']
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)

    @staticmethod
    def delete_cookie(response):
        response.delete_cookie('access_token')

    @staticmethod
    def get_refresh_token(request):
        refresh_token = request.data.get('refresh')
        if refresh_token:
            # something starange here??
            return RefreshToken(refresh_token)
        return None


class CookieTokenRefreshView(TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('access'):
            response.set_cookie('access_token',
                                response.data['access'],
                                samesite='None',
                                secure=True,
                                httponly=True,
                                )
            del response.data['access']
        return super().finalize_response(request, response, *args, **kwargs)


class CookieTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get('access_token')
        serializer = self.get_serializer(data={'token': token})
        serializer.is_valid(raise_exception=True)
        return Response({'detail': 'Token is valid'})
