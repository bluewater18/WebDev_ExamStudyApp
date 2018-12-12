using System;
using System.Collections.Generic;
using ExamStudy.Business.Interfaces;
using ExamStudy.Entities;
using ExamStudy.Repository.Interfaces;

namespace ExamStudy.Business
{
    public class AnswerManager : IAnswerManager
    {
        IQuestionRepository _questionRepository;
        IAnswerRepository _answerRepository;
        Validator _validator;

        public AnswerManager(IQuestionRepository questionRepository, IAnswerRepository answerRepository)
        {
            _questionRepository = questionRepository;
            _answerRepository = answerRepository;
            _validator = new Validator();
        }

        public Answer AddAnswer(Answer answer)
        {
            return _answerRepository.AddAnser(answer);
        }

        public bool DeleteAnswer(int answerId)
        {
            if (_answerRepository.DeleteAnswer(answerId))
                return true;
            throw new CustomDomainException("could not delete answer");
        }

        public Answer GetAnswer(int answerId)
        {
            return _answerRepository.GetAnswer(answerId);
        }

        public Answer UpdateAnswer(Answer answer)
        {
            if (_answerRepository.UpdateAnswer(answer))
            {
                return _answerRepository.GetAnswer(answer.AnswerId);
            }
            throw new CustomDomainException("could not update anser");
        }

        public bool UpdateAnswerPhoto(int answerId, string path)
        {
            return _answerRepository.UpdateAnswerPhoto(answerId, path);
        }
    }
}