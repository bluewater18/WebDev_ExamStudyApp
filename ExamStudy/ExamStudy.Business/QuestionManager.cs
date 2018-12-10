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

        public Question AddQuestion(Question question, int resourceId)
        {
            throw new NotImplementedException();
        }

        public bool DeleteQuestion(int questionId)
        {
            throw new NotImplementedException();
        }

        public Question GetQuestion(int questionId)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }
    }
}