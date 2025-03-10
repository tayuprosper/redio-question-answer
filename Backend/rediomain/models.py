from django.db import models
from django.contrib.auth.models import User

class Question(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    code_sample = models.TextField(null=True,blank=True)
    answer_count = models.IntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    is_redundant = models.BooleanField(default=False)

class Answer(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    code_sample = models.TextField(null=True,blank=True)
    upvotes = models.IntegerField(default=0)
    is_valid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

class UpVote(models.Model):
    id = models.AutoField(primary_key=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
