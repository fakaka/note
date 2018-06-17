# Java集合对象排序
---

1.List排序
这个和数组的排序又不一样了。
其实Java针对数组和List的排序都有实现，对数组而言，你可以直接使用Arrays.sort，对于List和Vector而言，你可以使用Collections.sort方法。
Java API针对集合类型的排序提供了2个方法:
java.util.Collections.sort(java.util.List)
java.util.Collections.sort(java.util.List, java.util.Comparator)
如果集合里面的元素都是相同类型的，并且实现了Comparable接口，那么可以直接调用第一个方法。
如果你有其它的排序的想法，比如你不想按照自然排序进行，还可以传一个Comparator过去，比如反向。
元素不相同的情况比较复杂，可以暂时不用考虑。
总的来说，如果你有一个新的类，比如Player，那么你要想对其进行排序，就让其实现Comparable接口，并且实现compareTo方法。比如比想按照年龄的大小来排序，从小的进行，那么你就实现如下:
``` java
public class Player implements Comparable<Player>{  
private String name;  
    private int age;  

    public Player(String name, int age){  
    this.name=name;  
    this.age=age;  
    }  

    public int getAge(){  
    return age;  
    }  

    public void setAge(int age){  
    this.age = age;  
    }  
    //实现接口方法，将来排序的时候sort看正负数还是零来进行判断大小   
    @Override
    public int compareTo(Player player){  
        return this.getAge() - player.getAge();  
    }  
}
```
Comparable接口默认是按照自然顺序进行排列的，当然，你可以出其不意地直接将compareTo方法反着实现，也可以，只是约定上不要这样，你不混淆，别人可能会混淆的。都按照约定来，就不太容易混乱。所以Comparator其实是当你不满意自然排序的时候，或者说简单的自然排序无法实现你想要的排序的时候，比如你想按照数值的绝对值大小来进行排序，显然就没法用Comparable，你得自己写一个Comparator的实现类，实现compare方法，按照你想要的方式返回正数负数或者零。
有一些系统自带的Comparator，比如Collections.reverseOrder()， String.CASE_INSENSITIVE_ORDER。

2. Set排序
Java对于Set有按照自然顺序排列的实现类，TreeSet，对这个TreeSet对象的引用进行操作就行了，自己就是排好序的。当然，TreeSet也提供了多个构造方法，尤其是接收Comparator类型参数的构造方法，允许开发者按照自己的想法进行排序，而不仅是局限于自然排序。
还有一种方式就是将set直接装进一个list对象里面，然后使用排序就好。

3. Map排序
这个就稍微麻烦一些了。
Map是键值对，所以既可以按照键进行排序，也可以按照值进行排序。通常因为键不能同，但是值可以同，所以很多都是用值来进行排序。先举个例子吧。
原理其实最后还是得转换成List比较方便一些。
Map遍历的时候要使用一个东西叫做Map.Entry，假如你有一个Map的对象map，那么你可以使用map.entrySet()获取一个set对象，里面装的都是Map.Entry，如果你想遍历，很简单地使用iterator就可以获取里面的所有元素。如果你要排序，那么就最好是将这个set装到一个list里面去，然后定义一个Comparator对象，在里面实现compare方法，返回一个差值，比如运动员得分的差值，然后使用Collections.sort方法，将list对象和comparator对象传进去，排序就完成了。
举个例子吧

``` java
public class MapSort{  
public static void main(String[] args){  
    Map<String, Player> map = new HashMap<String, Player>();  
    Player p1 = new Player("John", 1000);  
    Player p2 = new Player("Ben", 3000);  
    Player p3 = new Player("Jack", 2000);  
    map.put(p1);  
    map.put(p2);  
    map.put(p3);  
    //将Map里面的所以元素取出来先变成一个set，然后将这个set装到一个list里面  
    List<Map.Entry<String, Player>> list = new ArrayList<Map.Entry<String, Player>>(map.entrySet());  
    //定义一个comparator  
    Comparator<Map.Entry<String, Player>> comparator = new Comparator<Map.Entry<String, Player>>(){  
            [@Override](/user/Override)  
            public int compare(Entry<String, Player> p1, Entry<String, Player> p2){  
                    //之所以使用减号，是想要按照分数从高到低来排列  
                    return -(p1.getValue().score - p2.getValue().score);  
                }  
    };  
    Collections.sort(list, comparator);  
    for(Map.Entry<String, Player> entry:list){  
            System.out.println(entry.getValue().name + ":" + entry.getValue().score);  
    }  
}  
}  

class Player{  
String name;  
int score;   
public Player(String name, int score){  
    this.name == name;  
    this.score == score;    
}     
}
```
这样排序下来，最后就会输出如下内容

Ben:3000
Jack:2000
John:1000

说到最后总结一下，其实所有的集合排序最后都可以转换为List的排序，因为Collections本身提供了对List排序的支持。
Map可以变为set，set可以变为list，所以都可以变为list。
1. 对于最简单的情况，就是要被排序的类实现一个Comparable接口，然后实现compare方法，按照自然的方式进行减运算，返回减运算的结果，然后直接使用Collections.sort(List list)方法就行了。这一种叫做自然排序，只适合原始的List和Set。
2. 如果你不想使用自然排序，没问题，那么就定义一个Comparator对象，将逻辑在那里面去实现，然后使用Collections.sort(List list, Comparator comparator)。
3. 对于Map来说，稍微复杂一点，但是原理也就是第2种情况。
