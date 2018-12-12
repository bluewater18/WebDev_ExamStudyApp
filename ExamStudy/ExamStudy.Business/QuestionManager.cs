using System;
using System.Collections.Generic;
using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;
using ExamStudy.Repository.Interfaces;

namespace ExamStudy.Business
{
    public class QuestionManager : IQuestionManager
    {
        IQuestionRepository _questionRepository;
        IAnswerRepository _answerRepository;
        Validator _validator;

        public QuestionManager(IQuestionRepository questionRepository, IAnswerRepository answerRepository)
        {
            _questionRepository = questionRepository;
            _answerRepository = answerRepository;
            _validator = new Validator();
        }

        public Question AddQuestion(Question question)
        {
            if (_validator.IsNullOrEmpty(question.QuestionText) || _validator.IsNullOrEmpty(question.QuestionTitle))
                throw new InvalidObjectException("Question missing title or text");
            return _questionRepository.AddQuestion(question);
        }

        public bool DeleteQuestion(int questionId)
        {
            if (_questionRepository.DeleteQuestion(questionId))
                return true;
            throw new CustomDomainException("could not delete question");
                     
        }

        public Question GetQuestion(int questionId)
        {
            return _questionRepository.GetQuestion(questionId);
        }

        public IList<Question> GetResourceQuestions(int resourceId)
        {
            IList<Question> questions = _questionRepository.GetQuestions(resourceId);
            foreach (Question q in questions)
            {
                q.QuestionAnswers = _answerRepository.GetAnswers(q.QuestionId);
            }

            return questions;
        }

        public Question UpdateQuestion(Question question)
        {
            if (_questionRepository.UpdateQuestion(question))
                return _questionRepository.GetQuestion(question.QuestionId);
            throw new CustomDomainException("could not update question");
        }

        public bool UpdateQuestionPhoto(int questionId, string path)
        {
            return _questionRepository.UpdateQuestionPhoto(questionId, path);
        }
    }
}