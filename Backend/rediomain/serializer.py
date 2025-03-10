from rest_framework import serializers
from .models import Question, Answer, UpVote, User
from rest_framework_simplejwt.authentication import  JWTAuthentication
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','first_name','last_name','email','password']
        extra_kwargs = {"password": {"write_only": True}} 

    def create(self, validated_data):
        print("Fixing user")
        password = validated_data.pop("password", None)
        print("Password ", password)
        user = User(**validated_data)
        user.set_password(password)
        print(user.password)
        return user


class QuestionSerializer(serializers.ModelSerializer):
    author_info = serializers.SerializerMethodField()
    author_info = serializers.SerializerMethodField()
    class Meta:
        model = Question
        fields = ['id','content', 'code_sample', 'created_at', 'updated_at', 'is_redundant', 'author_info']

    def get_author_info(self, obj):
        return {
            "username" : obj.author.username,
            "firstname": obj.author.first_name,
            "lastname": obj.author.last_name,
        }
    def create(self, validated_data):
        req = self.context["req"]
        auth_res = JWTAuthentication().authenticate(req)
        user, _ =auth_res
        validated_data["author"] = user  # Set author to logged-in user
        return super().create(validated_data)


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'author','content', 'code_sample','is_valid', 'upvotes', 'created_at', 'updated_at',]

class SerializeQuestionWithAnswers(serializers.ModelSerializer):
    top_answers = serializers.SerializerMethodField()
    author = UserSerializer()
    class Meta:
        model = Question
        fields = ['id','content', 'code_sample', 'created_at', 'updated_at', 'is_redundant', 'author', 'top_answers']
        
    def get_top_answers(self, obj):
        top_answers = obj.answer_set.order_by('-upvotes')[:3]
        return AnswerSerializer(top_answers, many= True).data
    
class UpvoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpVote
        fields = ['id','author','answer','created_at','updated_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','first_name', 'last_name']