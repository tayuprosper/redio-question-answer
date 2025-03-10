from . import views
from django.urls import path

urlpatterns = [
    path('', views.Home),
    path('login/', views.Login),
    path('auth/tokenrefresh/', views.refreshToken),
    path('questions/<int:pid>', views.getQuestion),
    path('question/post', views.postQuestion),
    path('answers/<int:pid>', views.getPostAnswers),
    path('answer/like/<int:pid>/<int:uid>', views.putUpvote),
    path('answer/unlike/<int:aid>/<int:uid>', views.removeUpvote),
    path('question/delete/', views.removeQuestion),
    path('user/create/', views.createUser),
    path('answer/delete/<int:uid>/<int:aid>', views.removeAnswer),
    path('question/putanswer/', views.putAnswer),
    path('user/profile', views.dashboard),
    path('user/data', views.GetUser),
    path('question/edit', views.EditQuestion),

]