from django.urls import path
from .views import (CreateUserAPI,
                    ListUserAPI,
                    CookieTokenObtainPairView,
                    CookieTokenRefreshView,
                    CookieTokenVerifyView,
                    CookieTokenBlacklistView,
                    RatingAPI,
                    OrderAPI,
                    TypeOfGoodsAPI,
                    RecyclePointAPI,
                    FilteredOrderAPI,
                    )


urlpatterns = [
     path('signup/', CreateUserAPI.as_view()),
     path('users/',
          ListUserAPI.as_view({'get': 'list', 'post': 'create'}),
          ),

     path('typeofgoods/',
          TypeOfGoodsAPI.as_view({'get': 'list', 'post': 'create'}),
          name='typeofgoods',
          ),

     path('token/',
          CookieTokenObtainPairView.as_view(),
          name='token_obtain_pair',
          ),

     path('token/refresh/',
          CookieTokenRefreshView.as_view(),
          name='token_refresh',
          ),

     path('token/blacklist/',
          CookieTokenBlacklistView.as_view(),
          name='token_blacklist',
          ),

     path('token/verify/',
          CookieTokenVerifyView.as_view(),
          name='token_verify',
          ),

     path('createorder/',
          OrderAPI.as_view({'get': 'list', 'post': 'create'}),
          name='createorder',
          ),

     path('updateorder/<int:pk>/',
          OrderAPI.as_view({'get': 'retrieve', 'put': 'update'}),
          name='update',
          ),

     path('filteredorders/',
          FilteredOrderAPI.as_view({'get': 'list'}),
          name='filteredorders',
          ),
     
     path('creatororders/',
          FilteredOrderAPI.as_view({'get': 'list'}),
          name='creatororders',
          ),


     path('listorders/',
          OrderAPI.as_view({'get': 'list'}),
          name='listorders',
          ),

     ]
