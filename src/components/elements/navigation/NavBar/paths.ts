import { ISubNav } from '../SubNav/SubNav';
import {
  FiStar,
} from 'react-icons/fi';
import {
  AiOutlineHome,
  AiOutlineSend,
  AiOutlineShop,
  AiFillDollarCircle,
} from 'react-icons/ai';
import {
  BiTransferAlt,
  BiTransfer,
  BiCoffeeTogo,
} from 'react-icons/bi';
import {
  MdAccountBalanceWallet
} from 'react-icons/md';
import { IoSwapVerticalOutline } from 'react-icons/io5'

const NAV_LINKS: ISubNav[] = [
  {
    label: 'Home',
    href: '/',
    icon: AiOutlineHome,
  },
  {
    label: 'Transactions',
    href: '/transactions',
    icon: BiTransferAlt,
  },
  {
    label: 'Transfers',
    href: '#',
    icon: BiTransfer,
    children: [
      {
        label: 'Tokens',
        subLabel: 'Get your Token transfers',
        href: '/transfers/erc20',
        logo: undefined,
        icon: FiStar,
      },
      {
        label: 'NFT',
        subLabel: 'Get your ERC721 an ERC1155 transfers',
        href: '/transfers/nft',
        logo: undefined,
        icon: FiStar,
      },
    ],
  },
  {
    label: 'Balances',
    href: '#',
    icon: MdAccountBalanceWallet,
    children: [
      {
        label: 'Tokens',
        subLabel: 'Get your Token balances',
        href: '/balances/erc20',
        logo: undefined,
        icon: FiStar,
      },
      {
        label: 'NFT',
        subLabel: 'Get your ERC721 an ERC1155 balances',
        href: '/balances/nft',
        logo: undefined,
        icon: FiStar,
      },
    ],
  },
  {
    label: 'Send',
    href: '#',
    icon: AiOutlineSend,
    children: [
      {
        label: 'Send',
        subLabel: 'Send Native Token',
        href: '/send/sendnativetoken',
        logo: undefined,
        icon: AiOutlineSend,
      },
      {
        label: 'Send Tokens',
        subLabel: 'Send (ERC20/BEP20) Tokens',
        href: '/send/sendtokens',
        logo: undefined,
        icon: FiStar,
      },
      {
        label: 'Send ERC721 Tokens',
        subLabel: 'Transfer ERC721 Tokens (Non-Fungible)',
        href: '#',
        logo: undefined,
        icon: FiStar,
      },
      {
        label: 'Send ERC1155 Tokens',
        subLabel: 'Transfer ERC1155 Tokens (Semi-Fungible)',
        href: '#',
        logo: undefined,
        icon: FiStar,
      },
    ],
  },
  {
    label: 'Swap',
    href: '#',
    icon: IoSwapVerticalOutline,
    children: [
      {
        label: 'Swap Native Token',
        subLabel: 'Swap Native To Tokens',
        href: '/swap/swaptokens',
        logo: undefined,
        icon: FiStar,
      },
      {
        label: 'Swap Tokens (Soon!)',
        subLabel: 'Swap Tokens',
        href: '#',
        logo: undefined,
        icon: FiStar,
      },
    ],
  },
  {
    label: 'Lottery',
    href: '#',
    icon: AiFillDollarCircle,
    children: [
      {
        label: '30 mins Lottery',
        subLabel: 'Lottery Draw Every 30 mins',
        href: '/lottery/lottery30',
        logo: undefined,
        icon: FiStar,
      },
      {
        label: 'Daily Lottery',
        subLabel: 'Lottery Draw Every 24h',
        href: '/lottery/lotteryday',
        logo: undefined,
        icon: FiStar,
      },
      {
        label: 'Weekly Lottery',
        subLabel: 'Lottery Draw Every Week',
        href: '/lottery/lotteryweek',
        logo: undefined,
        icon: FiStar,
      },
      {
        label: 'Monthly Lottery',
        subLabel: 'Lottery Draw Every Month',
        href: '/lottery/lotterymonth',
        logo: undefined,
        icon: FiStar,
      },
    ],
  },
  {
    label: 'Escrow (Soon!)',
    href: '#',
    icon: AiOutlineShop,
  },
  {
    label: 'Buy Us A Coffee',
    href: '/buyusacoffee',
    icon: BiCoffeeTogo,
  }
];

export default NAV_LINKS;
