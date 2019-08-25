import React, {ChangeEvent} from "react";
import * as services from '../../backbone/services'

interface Props {
  onSave: (addresses: string[]) => void
  address: string
}

interface State {
  addresses: string[]
}

export class AddressesForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      addresses: [this.props.address]
    }
  }

  handleSubmit(e: any) {
    e.preventDefault();
    this.props.onSave(this.state.addresses)
  }

  async handleChange(e: ChangeEvent<HTMLInputElement>): Promise<void> {
    const value = e.target.value
    const web3 = await services.accountService.web3()
    const addresses = value.replace(/\s+/g, '').split(',').filter(smth => {
      return web3.utils.isAddress(smth)
    }).concat(this.props.address).filter((a, i, array) => {
      return array.indexOf(a) == i // uniq
    })
    this.setState({
      addresses: addresses
    })
  }

  render () {
    return <>
      <p>Please, use commas to separate the addresses:</p>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p><input type={"text"} onChange={this.handleChange.bind(this)} style={{width: '80%'}}/></p>
        <p>{this.state.addresses.join(', ')}</p>
        <p><button type={"submit"}>Save</button></p>
      <br/>
    </form>
      </>
  }
}
