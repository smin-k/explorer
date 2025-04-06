# 🌍 WorldLand Block Explorer

A lightweight block explorer for the [WorldLand](https://github.com/smin-k/WorldLand_BCAI) blockchain, based on the original Etherparty EthExplorer.  
This fork adds support for ECCPoW, including LDPC `codeword`, `codeLength`, and extended metadata parsing.

---

## 🧩 Features

- Displays block, transaction, and address data
- Shows ECCPoW-specific fields:
  - `codeword` (both raw and decoded as binary string)
  - `codelength`
  - `extraData` decoding
- Works in a local private network environment with [`WorldLand_BCAI`](https://github.com/smin-k/WorldLand_BCAI)

---

## 📦 Installation

### 1. Prerequisites

- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Install [Node.js & npm](https://nodejs.org/)
- Install [Geth-compatible WorldLand client](https://github.com/smin-k/WorldLand_BCAI)

### 2. Clone and Start

```bash
git clone https://github.com/smin-k/explorer
cd explorer
npm install
npm start
