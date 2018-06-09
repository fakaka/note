# Java 8 实战

- [Java 8 实战](#java-8-实战)
    - [第一章](#第一章)
        - [过滤隐藏文件](#过滤隐藏文件)
        - [流](#流)
    - [第二章](#第二章)

## 第一章

### 过滤隐藏文件
Java 8之前
``` java
File[] hiddenFiles = new File(".").listFiles(new FileFilter() {
    public boolean accept(File file) {
        return file.isHidden();
    }
});
```
Java 8
``` java
File[] hiddenFiles = new File(".").listFiles(File::isHidden);
```

### 流
比方说，你需要从一个列表中筛选金额较高的交易，然后按货币分组  

Java 8 之前
``` java
Map<Currency, List<Transaction>> transactionsByCurrencies = new HashMap<>();
for (Transaction transaction : transactions) {
    if(transaction.getPrice() > 1000){
        Currency currency = transaction.getCurrency();
        List<Transaction> transactionsForCurrency = transactionsByCurrencies.get(currency);
        if (transactionsForCurrency == null) {
            transactionsForCurrency = new ArrayList<>();
            transactionsByCurrencies.put(currency,transactionsForCurrency);
        }
        transactionsForCurrency.add(transaction);
    }
}
```

Java 8
``` java
Map<Currency, List<Transaction>> transactionsByCurrencies = transactions.stream()
    .filter((Transaction t) -> t.getPrice() > 1000)
    .collect(groupingBy(Transaction::getCurrency));
```


## 第二章

















