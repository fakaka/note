
  # Java 对象序列化 NIO NIO2 深度解析
  ---
  
  对象序列化
  
  对象序列化机制允许把内存中的Java对象转换成与平台无关的二进制流，从而可以保存到磁盘或者进行网络传输，其它程序获得这个二进制流后可以将其恢复成原来的Java对象。 序列化机制可以使对象可以脱离程序的运行而对立存在
  
  序列化的含义和意义
  
  序列化
  
  序列化机制可以使对象可以脱离程序的运行而对立存在
  
  序列化（Serialize）指将一个java对象写入IO流中，与此对应的是，对象的反序列化（Deserialize）则指从IO流中恢复该java对象
  
  如果需要让某个对象可以支持序列化机制，必须让它的类是可序列化（serializable），为了让某个类可序列化的，必须实现如下两个接口之一：
  
  Serializable：标记接口，实现该接口无须实现任何方法，只是表明该类的实例是可序列化的
  Externalizable
  所有在网络上传输的对象都应该是可序列化的，否则将会出现异常；所有需要保存到磁盘里的对象的类都必须可序列化；程序创建的每个JavaBean类都实现Serializable；
  
  使用对象流实现序列化
  
  实现Serializable实现序列化的类，程序可以通过如下两个步骤来序列化该对象：
  
  1.创建一个ObjectOutputStream，这个输出流是一个处理流，所以必须建立在其他节点流的基础之上
  
  // 创建个ObjectOutputStream输出流
  ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("object.txt"));
  2.调用ObjectOutputStream对象的writeObject方法输出可序列化对象
  
  // 将一个Person对象输出到输出流中
  oos.writeObject(per);
  定义一个NbaPlayer类，实现Serializable接口，该接口标识该类的对象是可序列化的
  
  public class NbaPlayer implements java.io.Serializable
  {
      private String name;
      private int number;
      // 注意此处没有提供无参数的构造器!
      public NbaPlayer(String name, int number)
      {
          System.out.println("有参数的构造器");
          this.name = name;
          this.number = number;
      }
  
      // name的setter和getter方法
      public void setName(String name)
      {
          this.name = name;
      }
      public String getName()
      {
          return this.name;
      }
  
      // number的setter和getter方法
      public void setNumber(int number)
      {
          this.number = number;
      }
      public int getNumber()
      {
          return this.number;
      }
  }
  使用ObjectOutputStream将一个NbaPlayer对象写入磁盘文件
  
  import java.io.*;
  
  public class WriteObject
  {
      public static void main(String[] args)
      {
          try(
              // 创建一个ObjectOutputStream输出流
              ObjectOutputStream oos = new ObjectOutputStream(
                  new FileOutputStream("object.txt")))
          {
              NbaPlayer player = new NbaPlayer("维斯布鲁克", 0);
              // 将player对象写入输出流
              oos.writeObject(player);
          }
          catch (IOException ex)
          {
              ex.printStackTrace();
          }
      }
  }
  反序列化
  
  从二进制流中恢复Java对象，则需要使用反序列化，程序可以通过如下两个步骤来序列化该对象：
  
  1.创建一个ObjectInputStream输入流，这个输入流是一个处理流，所以必须建立在其他节点流的基础之上
  
  // 创建个ObjectInputStream输出流
  ObjectInputStream ois = new ObjectInputStream(new FileInputStream("object.txt"));
  2.调用ObjectInputStream对象的readObject()方法读取流中的对象，该方法返回一个Object类型的Java对象，可进行强制类型转换成其真实的类型
  
  // 从输入流中读取一个Java对象，并将其强制类型转换为Person类
  Person p = (Person)ois.readObject();
  从object.txt文件中读取NbaPlayer对象的步骤
  
  import java.io.*;
  public class ReadObject
  {
      public static void main(String[] args)
      {
          try(
              // 创建一个ObjectInputStream输入流
              ObjectInputStream ois = new ObjectInputStream(
                  new FileInputStream("object.txt")))
          {
              // 从输入流中读取一个Java对象，并将其强制类型转换为NbaPlayer类
              NbaPlayer player = (NbaPlayer)ois.readObject();
              System.out.println("名字为：" + player.getName()
                  + "\\n号码为：" + player.getNumber());
          }
          catch (Exception ex)
          {
              ex.printStackTrace();
          }
      }
  }
  反序列化读取的仅仅是Java对象的数据，而不是Java类，因此采用反序列化恢复Java对象时，必须提供Java对象所属的class文件，否则会引发ClassNotFoundException异常；反序列化机制无须通过构造器来初始化Java对象
  
  如果使用序列化机制向文件中写入了多个Java对象，使用反序列化机制恢复对象必须按照实际写入的顺序读取。当一个可序列化类有多个父类时（包括直接父类和间接父类），这些父类要么有无参的构造器，要么也是可序列化的—否则反序列化将抛出InvalidClassException异常。如果父类是不可序列化的，只是带有无参数的构造器，则该父类定义的Field值不会被序列化到二进制流中
  
  对象引用的序列化
  
  如果某个类的Field类型不是基本类型或者String类型，而是另一个引用类型，那么这个引用类型必须是可序列化的，否则有用该类型的Field的类也是不可序列化的
  
  public class AllStar implements java.io.Serializable
  {
      private String name;
      private NbaPlayer player;
      public AllStar(String name, NbaPlayer player)
      {
          this.name = name;
          this.player = player;
      }
      // 此处省略了name和player的setter和getter方法
  
      // name的setter和getter方法
      public String getName()
      {
          return this.name;
      }
  
      public void setName(String name)
      {
          this.name = name;
      }
  
      // player的setter和getter方法
      public NbaPlayer getPlayer() 
      {
          return player;
      }
  
      public void setPlayer(NbaPlayer player) 
      {
          this.player = player;
      }
  }
  Java特殊的序列化算法
  
  所有保存到磁盘中的对象都有一个序列化编号
  当程序试图序列化一个对象时，程序将先检查该对象是否已经被序列化过，只有该对象从未（在本次虚拟中机）被序列化过，系统才会将该对象转换成字节序列并输出
  如果某个对象已经序列化过，程序将只是直接输出一个序列化编号，而不是再次重新序列化该对象
  import java.io.*;
  public class WriteAllStar
  {
      public static void main(String[] args)
      {
          try(
              // 创建一个ObjectOutputStream输出流
              ObjectOutputStream oos = new ObjectOutputStream(
                  new FileOutputStream("allStar.txt")))
          {
              NbaPlayer player = new NbaPlayer("詹姆斯哈登", 13);
              AllStar allStar1 = new AllStar("西部全明星", player);
              AllStar allStar2 = new AllStar("首发后卫", player);
              // 依次将四个对象写入输出流
              oos.writeObject(allStar1);
              oos.writeObject(allStar2);
              oos.writeObject(player);
              oos.writeObject(allStar2);
          }
          catch (IOException ex)
          {
              ex.printStackTrace();
          }
      }
  }
  4个写入输出流的对象，实际上只序列化了3个，而且序列的两个AllStar对象的player引用实际是同一个NbaPlayer对象。以下程序读取序列化文件中的对象
  
  import java.io.*;
  public class ReadAllStar
  {
      public static void main(String[] args)
      {
          try(
              // 创建一个ObjectInputStream输出流
              ObjectInputStream ois = new ObjectInputStream(
                  new FileInputStream("allStar.txt")))
          {
              // 依次读取ObjectInputStream输入流中的四个对象
              AllStar star1 = (AllStar)ois.readObject();
              AllStar star2 = (AllStar)ois.readObject();
              NbaPlayer player = (NbaPlayer)ois.readObject();
              AllStar star3 = (AllStar)ois.readObject();
              // 输出true
              System.out.println("star1的player引用和player是否相同："
                  + (star1.getPlayer() == player));
              // 输出true
              System.out.println("star2的player引用和player是否相同："
                  + (star2.getPlayer() == player));
              // 输出true
              System.out.println("star2和star3是否是同一个对象："
                  + (star2 == star3));
          }
          catch (Exception ex)
          {
              ex.printStackTrace();
          }
      }
  }
  如果多次序列化同一个可变Java对象时，只有第一次序列化时才会把该Java对象转换成字节序列并输出
  
  当使用Java序列化机制序列化可变对象时，只有第一次调用WriteObject()方法来输出对象时才会将对象转换成字节序列，并写入到ObjectOutputStream；即使在后面程序中，该对象的实例变量发生了改变，再次调用WriteObject()方法输出该对象时，改变后的实例变量也不会被输出
``` java
import java.io.*;

public class SerializeMutable{
    public static void main(String[] args){

        try(
            // 创建一个ObjectOutputStream输入流
            ObjectOutputStream oos = new ObjectOutputStream(
                new FileOutputStream("mutable.txt"));
            // 创建一个ObjectInputStream输入流
            ObjectInputStream ois = new ObjectInputStream(
                new FileInputStream("mutable.txt")))
        {
            NbaPlayer player = new NbaPlayer("斯蒂芬库里", 30);
            // 系统会player对象转换字节序列并输出
            oos.writeObject(player);
            // 改变per对象的name实例变量
            player.setName("塞斯库里");
            // 系统只是输出序列化编号，所以改变后的name不会被序列化
            oos.writeObject(player);
            NbaPlayer player1 = (NbaPlayer)ois.readObject();    //①
            NbaPlayer player2 = (NbaPlayer)ois.readObject();    //②
            // 下面输出true，即反序列化后player1等于player2
            System.out.println(player1 == player2);
            // 下面依然看到输出"斯蒂芬库里"，即改变后的实例变量没有被序列化
            System.out.println(player2.getName());
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }
    }
}
```
