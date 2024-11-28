import raydium from '@/lib/raydium';
import { Connection, PublicKey } from '@solana/web3.js';

const conn = new Connection('https://mainnet.helius-rpc.com/?api-key=5c27681d-fcca-4886-8584-51e89282bfe9', 'confirmed')

const token = {
  getTokenInfo: async (mint: string) => {
    try {
      const data: any = (await raydium).api.getTokenInfo([mint])
      return data
    } catch (error) {
      console.log(error)
    }
  },
  list: async (limit?: number) => {
    try {
      const data = (await raydium).api.getTokenList()
      if (limit) {
        if (limit === 50) {
          return (await data).mintList.slice(0, 50)
        } else if (limit >= 51) {
          return (await data).mintList.slice(0, limit)
        }
      } else {
        return (await data).mintList
      }

    } catch (error) {
      console.log(error)
    }
  },
  getPairInfo: async (mintA: string, mintB: string) => {
    try {
      const data: any = (await raydium).api.fetchPoolByMints({ mint1: mintA, mint2: mintB })
      return data
    } catch (error) {
      console.log(error)
    }
  },
  getParsedTokenInfo: async (mint: string) => {
    try {
      const data = await conn.getParsedAccountInfo(new PublicKey(mint))
      return data
    } catch (error) {
      console.log(error)
    }
  }
}

export default token