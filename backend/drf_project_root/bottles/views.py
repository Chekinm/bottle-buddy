from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework_simplejwt.tokens import RefreshToken
from .auth import CookieJWTAuthentication

from rest_framework.permissions import (IsAuthenticated,
                                        AllowAny,
                                        )
from rest_framework.status import (HTTP_200_OK, 
                                   HTTP_201_CREATED,
                                   HTTP_400_BAD_REQUEST,
                                   HTTP_202_ACCEPTED,
                                   HTTP_403_FORBIDDEN
                                   )

from rest_framework.filters import BaseFilterBackend , SearchFilter, OrderingFilter

from .models import User, Supplier, Collector, Order, TypeOfGoods, RecyclePoint, Address
from .mixin import UserOperationsMixin, SupplierOperationsMixin, CollectorOperationsMixin 
from .mixin import OrderOperationsMixin, TypeOfGoodsOperationsMixin, RecyclePointOperationsMixin, AddressOperationsMixin

import jwt, datetime

from rest_framework.decorators import authentication_classes, permission_classes

from rest_framework_simplejwt.authentication import JWTAuthentication
from .auth import CookieJWTAuthentication


##### page to connect to django with fetch ######
def index (request):
   
    context = {}
    return render(request,'bottles/index.html',context)



class CreateUserAPI (UserOperationsMixin, GenericAPIView):
    # authentication_classes = [CookieJWTAuthentication]
    # permission_classes = (AllowAny,)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    

class ListUserAPI (UserOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication,]
    permission_classes = (IsAuthenticated,)
    pass
    
class SupplierAPI(SupplierOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication,]
    permission_classes = (IsAuthenticated,)
    pass

class CollectorAPI(CollectorOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication,]
    permission_classes = (IsAuthenticated,)
    pass

class OrderAPI(OrderOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication,]
    permission_classes = (IsAuthenticated,)
    pass

class TypeOfGoodsAPI(TypeOfGoodsOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication,]
    permission_classes = (IsAuthenticated,)
    pass

class RecyclePointAPI(RecyclePointOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication,]
    permission_classes = (IsAuthenticated,)
    pass

class AddressAPI(AddressOperationsMixin, GenericViewSet):
    authentication_classes = [CookieJWTAuthentication,]
    permission_classes = (IsAuthenticated,)
    


## Token autorzaion API

class CookieTokenObtainPairView(TokenObtainPairView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('access'):
            response.set_cookie('access_token', response.data['access'], httponly=True)
            response.set_cookie('refresh_token', response.data['refresh'], httponly=True)
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
            return RefreshToken(refresh_token)
        return None
    


class CookieTokenRefreshView(TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('access'):
            response.set_cookie('access_token', response.data['access'], httponly=True)
            del response.data['access']
        return super().finalize_response(request, response, *args, **kwargs)
    


class CookieTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        token = request.COOKIES.get('access_token')
        serializer = self.get_serializer(data={'token': token})
        serializer.is_valid(raise_exception=True)
        return Response({'detail': 'Token is valid'})
    




















# class LoginAPI (GenericAPIView):

#     permission_classes = (AllowAny,)

#     def post(self, request):
#         email = request.data['email']
#         password = request.data['password']

#         user = User.objects.filter(email=email).first()

#         if user is None:
#             raise AuthenticationFailed ('User not found!')
        
#         if not user.check_password(password):
#             raise AuthenticationFailed ('Incorrect password!')
        
#         payload = {
#             'id': user.id,
#             'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=60),
#             'iat': datetime.datetime.utcnow(),
#         }

#         token = jwt.encode(payload, 'secret', algorithm='HS256')

#         response = Response()
#         response.set_cookie(key='jwt', value=token, httponly=True)
#         response.data = {
#             'jwt': token
#         }

#         return response

        

    



# from rest_framework.generics import GenericAPIView
# from rest_framework.viewsets import GenericViewSet

# from .app_mixin import EmployeeOperationsMixin, DepartmentOperationsMixin
# from .app_mixin import ProjectOperationsMixin, TaskOperationsMixin
# from rest_framework.permissions import AllowAny, IsAdminUser
# from .permissions import IsDepartmentAdmin


# class EmployeesViewSet (EmployeeOperationsMixin, GenericViewSet):

#     permission_classes = [IsDepartmentAdmin,]

# class EmployeeDetailedViewSet (EmployeeOperationsMixin, GenericViewSet):

#     permission_classes = [IsDepartmentAdmin,]
      

# class DepartmentsViewSet (DepartmentOperationsMixin, GenericViewSet):

#     permission_classes = (IsDepartmentAdmin,)
    
    
# class DepartmentDetailedViewSet (DepartmentOperationsMixin, GenericViewSet):

#     permission_classes = (IsDepartmentAdmin,)
    

# class TasksViewSet (TaskOperationsMixin, GenericViewSet):

#     permission_classes = (AllowAny,)
        

# class TaskDetailedViewSet (TaskOperationsMixin, GenericViewSet):

#     permission_classes = (AllowAny,)
    
# class ProjectsViewSet (ProjectOperationsMixin, GenericViewSet):

#     permission_classes = (AllowAny,)
    
    
# class ProjectDetailedViewSet (ProjectOperationsMixin, GenericViewSet):

#     permission_classes = (AllowAny,)

#     # don't need is with viewset    
#     # def get(self, request, *args, **kwargs):
#     #     return self.retrieve(request, *args, **kwargs)

#     # def delete(self, request, *args, **kwargs):
#     #     return self.destroy(request, *args, **kwargs)
         
#     # def put(self, request, *args, **kwargs):
#     #     return self.update(request, *args, **kwargs)
   