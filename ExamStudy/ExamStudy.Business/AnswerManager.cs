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
            if (_validator.IsNullOrEmpty(answer.AnswerTitle) || _validator.IsNullOrEmpty(answer.AnswerText))
                throw new InvalidObjectException("Answer missing title or text");
            return _answerRepository.AddAnser(answer);
        }

        public bool DeleteAnswer(int answerId)
        {
            if (_answerRepository.DeleteAnswer(answerId))
                return true;
            throw new CustomDomainException("could not delete answer");
        }

        public bool DownvoteAnswer(int answerId, int userId)
        {
            try {
                return _answerRepository.DownvoteAnswer(answerId, userId);
            } catch (Exception e)
            {
                return _answerRepository.UpdateDownvoteAnswer(answerId, userId);
            }
            throw new CustomDomainException("could not add vote");
        }

        public Answer GetAnswer(int answerId)
        {
            return _answerRepository.GetAnswer(answerId);
        }

        public Answer UpdateAnswer(Answer answer)
        {
            if (_validator.IsNullOrEmpty(answer.AnswerTitle) || _validator.IsNullOrEmpty(answer.AnswerText))
                throw new InvalidObjectException("Answer missing title or text");
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

        public bool UpvoteAnswer(int answerId, int userId)
        {
            try
            {
                return _answerRepository.UpvoteAnswer(answerId, userId);
            }
            catch (Exception e)
            {
                return _answerRepository.UpdateUpvoteAnswer(answerId, userId);
            }
            throw new CustomDomainException("could not add vote");
        }
    }
}