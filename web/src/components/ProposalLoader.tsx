import React from "react";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import * as daos from "../redux/daos.redux";

interface DispatchProps {
    loadProposals: () => void
}

export class ProposalLoader extends React.Component<DispatchProps> {
    public componentDidMount(): void {
      this.props.loadProposals()
    }

    public render () {
        return this.props.children
    }
}

function dispatchToProps(dispatch: ThunkDispatch<any, any, any>): DispatchProps {
    return {
      loadProposals: () => {
        return dispatch(daos.loadProposals.action())
      }
    }
}

export default connect(null, dispatchToProps)(ProposalLoader);