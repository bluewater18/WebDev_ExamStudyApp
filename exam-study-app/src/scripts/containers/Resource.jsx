import React from 'react';
import '../../styles/main.scss';
import Proptypes from 'prop-types';
import QuestionItem from './QuestionItem';
import AddQuestion from './AddQuestion';
import { fetchActiveResource } from '../actions/action-resources';
import { bindActionCreators } from'redux';
import { connect } from 'react-redux';

class Resource extends React.Component {

    componentDidMount() {
        this.props.fetchActiveResource(this.props.resourceId)
    }
    render() {
        const questions = this.props.activeResource.resourceQuestions;
        if(questions!== null){
        const questionElements = questions.map((question) =>
            <QuestionItem key={question.questionId} question={question} />
        )
        return(
            <div className="resource">
                {questionElements}
                <AddQuestion/>
            </div>
        )
        }
        return(null);
    }


}

Resource.propTypes = {
    resourceId: Proptypes.string.isRequired,
}

function mapStateToProps(state) {
    return {
        activeResource: state.activeResource,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ 
        fetchActiveResource: fetchActiveResource,
        }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Resource);