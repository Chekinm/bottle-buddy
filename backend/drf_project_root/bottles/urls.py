from django.urls import path
from .views import (CreateUserAPI,
                    ListUserAPI,
                    CookieTokenObtainPairView,
                    CookieTokenRefreshView,
                    CookieTokenVerifyView,
                    # SupplierAPI,
                    # CollectorAPI,
                    # OrderAPI,
                    TypeOfGoodsAPI,
                    # RecyclePointAPI,
                    AddressAPI,
                    index)


urlpatterns = [
    path('signup/', CreateUserAPI.as_view()),
    path('users/', ListUserAPI.as_view({'get': 'list', 'post': 'create'})),

    path('typeofgoods/', TypeOfGoodsAPI.as_view({'get': 'list'})),
    path('addresses/', AddressAPI.as_view({'get': 'list'})),

    path('token/', 
         CookieTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    
    path('token/refresh/',
         CookieTokenRefreshView.as_view(),
         name='token_refresh'),

    path('token/verify/',
         CookieTokenVerifyView.as_view(),
         name='token_verify'),

    path('index/', index),
    
    # path('employees', EmployeesViewSet.as_view({'get':'list', 'post':'create'}), name='employees'), 
    # path('employees/<int:pk>', EmployeeDetailedViewSet.as_view({'get':'retrieve', 'put':'update'}), name='employee-detailed'), 

    # path('departments', DepartmentsViewSet.as_view({'get':'list', 'post':'create'}), name='departments'), 
    # path('departments/<int:pk>', DepartmentDetailedViewSet.as_view({'get':'retrieve', 'put':'update'}), name='department-detailed'), 
    
    # path('tasks', TasksViewSet.as_view({'get':'list', 'post':'create'}), name='tasks'), 
    # path('tasks/<int:pk>', TaskDetailedViewSet.as_view({'get':'retrieve', 'delete':'destroy','put':'update'}), name='task-detailed'), 
    
    # path('projects', ProjectsViewSet.as_view({'get':'list', 'post':'create'}), name='projects'),
    # path('projects/<int:pk>', ProjectDetailedViewSet.as_view({'get':'retrieve', 'delete':'destroy','put':'update'}), name='project-detailed'),
    ]