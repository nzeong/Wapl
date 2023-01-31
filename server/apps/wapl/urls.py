from django.urls import path
from . import views

app_name = "wapl"

urlpatterns= [
    path("main", views.main, name="main"),
    path("login", views.login, name="login"),
    path("logout", views.logout, name="logout"),
    path("signup", views.signup, name="signup"),
    path("", views.start, name="start"),
    path("kakao", views.kakao_login, name="kakao_login"),
    path("accounts/kakao/login/callback/", views.kakao_callback, name="kakao_callback"),
    # path("plan", views.create, name="create"), # 용현님 일정 ajax
    # path("plan/<int:pk>", views.comment, name="comment"), # 윤정님 일정 상세
]