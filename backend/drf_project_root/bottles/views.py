from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView,
                                            TokenVerifyView,
                                            TokenBlacklistView,
                                            )
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
                    RatingOperationsMixin,
                    OrderOperationsMixin,
                    TypeOfGoodsOperationsMixin,
                    RecyclePointOperationsMixin,
                    FilteredOrderOperationsMixin,
                    )

from .serializers import (MyTokenObtainPairSerializer,
                          CookieTokenRefreshSerializer,
                          CookieTokenBlackListSerializer
                          )

# as we deployed to different domain we need to set samesite to 'none'
COOKIES_SET_SAME_SITE = 'none'
COOKIES_SET_SECURE = True
COOKIES_SET_HTTPONLY = True


class CreateUserAPI (UserOperationsMixin, GenericAPIView):
    """
    Special class, with only post method.
    Allowed new user creates an account witout autentication
    """
    authentication_classes = []
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ListUserAPI (UserOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication, ]
    permission_classes = (IsAuthenticated, )
    pass


class RatingAPI(RatingOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication, ]
    permission_classes = (IsAuthenticated,)
    pass


class OrderAPI(OrderOperationsMixin, GenericViewSet):
    authentication_classes = []
    permission_classes = (AllowAny,)
    pass


class FilteredOrderAPI(FilteredOrderOperationsMixin, GenericViewSet):
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

# Token autorzaion API


class CookieTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('access'):
            response.set_cookie(
                'access_token',
                response.data['access'],
                samesite=COOKIES_SET_SAME_SITE,
                secure=COOKIES_SET_SECURE,
                httponly=COOKIES_SET_HTTPONLY,
                )
            response.set_cookie(
                'refresh_token',
                response.data['refresh'],
                samesite=COOKIES_SET_SAME_SITE,
                secure=COOKIES_SET_SECURE,
                httponly=COOKIES_SET_HTTPONLY,
                )
            response.set_cookie(
                'user_info_token',
                f'{response.data["first_name"]} {response.data["last_name"]}',
                samesite=COOKIES_SET_SAME_SITE,
                secure=COOKIES_SET_SECURE,
                )
            del response.data['access']
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)


class CookieTokenRefreshView(TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('access'):
            response.set_cookie('access_token',
                                response.data['access'],
                                samesite=COOKIES_SET_SAME_SITE,
                                secure=COOKIES_SET_SECURE,
                                httponly=COOKIES_SET_HTTPONLY,
                                )
            response.set_cookie(
                                'refresh_token',
                                response.data['refresh'],
                                samesite=COOKIES_SET_SAME_SITE,
                                secure=COOKIES_SET_SECURE,
                                httponly=COOKIES_SET_HTTPONLY,
                                )
            del response.data['access']
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)


class CookieTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get('access_token')
        serializer = self.get_serializer(data={'token': token})
        serializer.is_valid(raise_exception=True)
        return Response({'detail': 'Token is valid'})


class CookieTokenBlacklistView(TokenBlacklistView):
    authentication_classes = [CookieJWTAuthentication, ]
    permission_classes = (IsAuthenticated, )

    serializer_class = CookieTokenBlackListSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        print('from blacklisted', response.data)
        response.set_cookie('access_token',
                            'cookie_was_blacklisted',
                            samesite=COOKIES_SET_SAME_SITE,
                            secure=COOKIES_SET_SECURE,
                            httponly=COOKIES_SET_HTTPONLY,
                            )
        response.set_cookie(
                'refresh_token',
                'cookie_was_blacklisted',
                samesite=COOKIES_SET_SAME_SITE,
                secure=COOKIES_SET_SECURE,
                httponly=COOKIES_SET_HTTPONLY,
                )
        response.set_cookie(
                'user_info_token',
                'cookie_was_blacklisted',
                )
        return super().finalize_response(request, response, *args, **kwargs)
