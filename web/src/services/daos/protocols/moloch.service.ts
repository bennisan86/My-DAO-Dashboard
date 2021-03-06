import Web3 from "web3";

import KNOWN_MOLOCHS from "../../../data/moloch-daos.json";
import molochABI from "../../../abis/moloch.abi.json";
import erc20ABI from "../../../abis/erc20.abi.json";
import BigNumber from "bignumber.js";
import { BalanceService } from "../../balance.service";
import { DaoType } from "../../../model/dao-type";
import { Dao } from "../../../model/dao";
import { IDaoService } from "../dao.service";

export class MolochService implements IDaoService {
  constructor(private readonly web3: Web3, private readonly balanceService: BalanceService) {}

  private async getOneMolochDao(daoAddress: string, daoName: string, account: string): Promise<Dao> {
    const contract = new this.web3.eth.Contract(molochABI, daoAddress);
    const memberInfo = await contract.methods.members(account).call();
    const totalShares = await contract.methods.totalShares().call();
    const approvedTokenAddress = await contract.methods.approvedToken().call();
    const guildBankAddress = await contract.methods.guildBank().call();
    const approvedToken = new this.web3.eth.Contract(erc20ABI, approvedTokenAddress);
    const guildBalance = new BigNumber(await approvedToken.methods.balanceOf(guildBankAddress).call());
    const ethBalanceUsd = guildBalance.dividedBy(10 ** 18).multipliedBy(await this.balanceService.assetPrice("ETH"));
    const balance = [
      {
        symbol: "ETH",
        name: "Ether",
        contractAddress: "0x00",
        value: guildBalance,
        usdValue: ethBalanceUsd.toNumber()
      }
    ];
    return {
      address: daoAddress,
      name: daoName,
      kind: DaoType.MOLOCH,
      shareBalance: Number(memberInfo.shares),
      totalSupply: Number(totalShares),
      balance,
      usdBalance: ethBalanceUsd.toNumber()
    };
  }

  public async getDao(address: string): Promise<Dao> {
    throw new Error("Method not implemented.");
  }

  public async getDaos(): Promise<Dao[]> {
    throw new Error("Method not implemented.");
  }

  public async getDaosByAccount(account: string): Promise<Dao[]> {
    const all = await Promise.all(
      KNOWN_MOLOCHS.daos.map(daoDetails => {
        return this.getOneMolochDao(daoDetails.address, daoDetails.name, account);
      })
    );
    return all.filter(dao => dao.shareBalance !== 0);
  }
}
