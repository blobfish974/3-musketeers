# Currency 

> currency rates

**Table of Contents**

- [🐣 Introduction](#-introduction)
- [💻 Installation](#-objectives)
- [🛠 Usage](#%E2%80%8D-steps-to-do)


## 🐣 Introduction

This project allows you to convert money with the current exchange rate (using an API).


## 💻 Installation

After cloning the project run the following commands in a CLI to install the library

```sh
❯ cd /path/to/workspace/3-musketeers/currency
❯ npm install # or yarn

```

## 🛠 Usage

To execute the programm simply run:

```sh
❯ node cli.js
```
After a few seconds a result looking like the following will be displayed:

```sh
1 USD = 0.00011665630369835478 BTC
```
By default the conversion is USD to Bitcoins (BTC).

However, you can precise the exhange rate and amount as you want like !

The command line is
```sh
❯ node cli.js <amount> <from currency> <to currency>
``` 

For example by running:

```sh
❯ node cli.js 5 dkk eur
```
you get the following output:
```sh
5 DKK = 0.6693709250000001 EUR
```



