from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from django.core import serializers
from rest_framework.response import Response
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Question, Answer, UpVote, User
from .serializer import QuestionSerializer, AnswerSerializer, SerializeQuestionWithAnswers, UpvoteSerializer,UserSerializer
# Create your views here.

#tested and working
@api_view(['POST'])
def Login(req):
    username = req.data.get("username")
    password = req.data.get("password")
    try:
        user = authenticate(username=username,password=password)
        if (user):
            refresh = RefreshToken.for_user(user)
            print("User logged in with name" + user.username)
            return JsonResponse({"access" : str(refresh.access_token), "refresh": str(refresh)})
        else:
            return JsonResponse({"error" : "Username or password not correct!!"}, status=400)

    except User.DoesNotExist:
        return JsonResponse({"error" : "Username or password not correct!!"}, status=400)

#tested and working
@api_view(['POST'])
def createUser(req):
    user = User(username=req.data.get("username"),first_name=req.data.get("first_name"), last_name = req.data.get("last_name"), email=req.data.get("email"))
    user.set_password(req.data.get("password"))
    try:
        user.save()
        refresh = RefreshToken.for_user(user)
        access = refresh.access_token
        return JsonResponse({"refresh": str(refresh), "access": str(access)}, status=201)
    except Exception as e:
        print(e)
        return JsonResponse({"message": "invalid user data"}, status=status.HTTP_400_BAD_REQUEST)


#tested and working
@api_view(['GET'])
@csrf_exempt
def Home(req):
        user = None
        auth_res = JWTAuthentication().authenticate(req)
        user, _ = auth_res
        if user and not isinstance(user, AnonymousUser):
            questions = Question.objects.exclude(author = user)
        else:
            questions = Question.objects.all().order_by('-created_at')
        serializer = SerializeQuestionWithAnswers(questions, many=True)
        return JsonResponse(serializer.data, safe=False)
    
#to be teated DO NOT USE!!
@api_view((['GET']))
def getQuestion(req,pid):
    try:
        question = Question.objects.get(id=pid)
    except Question.DoesNotExist:
        return JsonResponse({'error': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = QuestionSerializer(question)
    return JsonResponse(serializer.data)

#tested and working
@api_view(['POST'])
@csrf_exempt
def postQuestion(req):
    user = None
    auth_res = JWTAuthentication().authenticate(req)
    user, _ = auth_res
    if user and not isinstance(user, AnonymousUser):
        print(user)
        serialize = QuestionSerializer(data=req.data, context={"req" : req})
        if serialize.is_valid():
            serialize.save()
            return JsonResponse(serialize.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serialize.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"Error": "invalid user"})
    # return JsonResponse({"Error": "invalid user"})
    

#to be tested DO NOT USE
@api_view(['GET'])
def getPostAnswers(req, pid):
    try:
        answers = Answer.objects.get(question=pid)
    except Answer.DoesNotExist:
        return JsonResponse({}, status=status.HTTP_204_NO_CONTENT)
    
    serializer = AnswerSerializer(answers)
    return JsonResponse(serializer.data)

#tested and working
@api_view(['POST'])
def putAnswer(req):
    user = None
    auth_res = JWTAuthentication().authenticate(req)
    user, _ = auth_res
    if user and not isinstance(user, AnonymousUser):
        question = Question.objects.get(id=req.data.get("post_id"))
        if question:
            answer = Answer(author=user, question=question, content=req.data.get("content"),code_sample=req.data.get("code_sample"))
            question.answer_count +=1
            question.save()
            answer.save()
            serializer = AnswerSerializer(data=answer)
            if serializer.is_valid():
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse({"success": "asnwer saved"}, status=status.HTTP_201_CREATED)
    else:
        return JsonResponse({'error': 'Invlid input'}, status=status.HTTP_400_BAD_REQUEST)
    #return JsonResponse({"error", something went wrong})

#to be tested DO NOT USE!!
@api_view(['PUT'])
def putUpvote(req,pid,uid):
    try:
        answer = Answer.objects.get(id=pid)
        user = User.objects.get(id=uid)
    except Answer.DoesNotExist:
        return JsonResponse({"message": "invalid user id"}, status=status.HTTP_400_BAD_REQUEST)
    
    #print(question.upvotes)
    user = {
        'author' : user.id,
        'answer' : answer.id
    }
    likeserialize = UpvoteSerializer(data=user)
    if not likeserialize.is_valid():
        return JsonResponse({"message": "answer post id"}, status=status.HTTP_400_BAD_REQUEST)

    likeserialize.save()
    answer.upvotes +=1
    answer.save()
    print(answer.upvotes)
    return HttpResponse({'success':"liked"}, status=status.HTTP_202_ACCEPTED)

#to be tested DO NOT USE!!
@api_view(['PUT'])
def removeUpvote(req,aid,uid):
    try:
        answer = Answer.objects.get(id=aid)
    except Question.DoesNotExist:
        return JsonResponse({'message': 'invalid post id'}, safe=False, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        upvote = UpVote.objects.get(id=uid)
    except UpVote.DoesNotExist:
        return JsonResponse({'message': 'invalid like id'}, safe=False, status=status.HTTP_400_BAD_REQUEST)
    answer.upvotes -=1
    answer.save()
    return HttpResponse({'success':'unlike'}, status=status.HTTP_202_ACCEPTED)


#to be tested DO NOT USE!!
@api_view(['DELETE'])
def removeQuestion(req):
    user = None
    auth_res = JWTAuthentication().authenticate(req)
    user, _ = auth_res
    if user and not isinstance(user, AnonymousUser):
        try:
            question = Question.objects.get(id=req.data.get('pk'))
            print("question author " + str(question.author))
            if question.author == user:
                question.delete()
                return JsonResponse({"Message": "Question deleted successfuly"}, status=200)
            else:
                print(user.id)
                print("Not user to delete")
                return JsonResponse({"Message": "can't delete non user message"}, status=400)
        except Exception as e:
            print(e)
            return JsonResponse({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        print("error user")
        return JsonResponse({'message': 'failed to authenticate user'}, status=status.HTTP_403_FORBIDDEN)


#to  be tested DO NOT USE!!
@api_view(['DELETE'])
def removeAnswer(req):
    user = None
    auth_res = JWTAuthentication().authenticate(req)
    user, _ = auth_res
    if user and not isinstance(user, AnonymousUser):
        try:
            question = Question.objects.get(id=req.data.get('pk'))
            if question.author == user:
                question.delete()
                return JsonResponse({"Message": "Question deleted successfuly"}, status=200)
            else:
                return JsonResponse({"Message": "can't delete non user message"}, status=400)
        except Exception as e:
            print(e)
            return JsonResponse({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'message': 'failed to authenticate user'}, status=status.HTTP_40)


#tested and working
@api_view(['POST'])
def refreshToken(req):
    try:
        refresh_token = req.data.get('refresh')
        print(refresh_token)
        if not refresh_token:
            return JsonResponse({"error": "refresh_token required"}, status=400)
        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)
        return JsonResponse({"access": access_token})
    except Exception as e:
        return JsonResponse({"Error":"Invalid refresh token"}, status=401)

#tested and working
@api_view(["GET"])
def dashboard(req):
    user = None
    auth_res = JWTAuthentication().authenticate(req)
    user, _ = auth_res
    
    if user and not isinstance(user, AnonymousUser):
        questions = Question.objects.filter(author=user).order_by('-created_at')
        result = serializers.serialize('json',questions)
        #print(result)
        return HttpResponse(result, content_type='application/json', status=200)
    
    else:
        return JsonResponse({"error": "Something went wrong"})



#tested and working
@api_view(['GET'])
def GetUser(req):
    user = None
    auth_res = JWTAuthentication().authenticate(req)
    user, _ = auth_res
    if user and not isinstance(user, AnonymousUser):
        try:
            print(user.id)
            data = User.objects.get(id=int(user.id))
            user_serialized = serializers.serialize('json',[data])
            return HttpResponse(user_serialized, content_type='application/json', status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({"Error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return JsonResponse({"Error": "Invalid user"}, status=401)   


#tested and working
@api_view(['POST'])
def EditQuestion(req):
    user = None
    auth_res = JWTAuthentication().authenticate(req)
    user, _ = auth_res
    if user and not isinstance(user, AnonymousUser):
        try:
            question = Question.objects.get(id=req.data.get('pk'))
            print(question)
            question.code_sample = req.data.get('code_sample')
            question.content = req.data.get('content')
            question.save()
            print(question)
            return JsonResponse({"success": "Question edited uccessfuly"}, status=status.HTTP_200_OK)
        except Question.DoesNotExist:
            return JsonResponse({"Error": "Question does not exist"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({"Error": "Invalid user"}, status=401)