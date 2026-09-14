# Multi-Explorer Link Generator

Generate links to Stellar blockchain explorers for accounts, transactions, and ledgers.

## What it does

- Enter a Stellar identifier (account, tx hash, ledger number)
- Auto-detects the target type
- Generates links to 4 explorers: StellarScan, StellarX, Steexp, Lumenscan
- Supports mainnet and testnet

## Design decisions

- **Fully offline**: No network requests. All URL construction is local.
- **Auto-detection**: Automatically detects account (G...), transaction (64 hex), and ledger (numeric).
- **Security**: Rejects seeds (S...) to prevent accidental exposure.

## Error handling

- Empty input → specific error
- Invalid target → specific error
