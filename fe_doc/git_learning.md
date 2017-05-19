## 关于git的学习  

### GIT分支-简单介绍  
任何版本控制系统都以某一种形式支持分支，使用分支意味着你可以把你的工作从开发主线上分离开来，以免影响开发主线。  

- 创建分支：  
``` git branch Branch_Name ```  

- 切换分支：  
``` git checkout Branch_Name ```  
在切换分支的时候如果与另外的分支修改了同一个文件一般需要提交本地分支的修改，才能继续切换分支  
强行切换会出现下面的错误提示：  
> error: Your local changes to the following files would be overwritten by checkout:
        fe_doc/git_learning.md
Please, commit your changes or stash them before you can switch branches.
Aborting

- 快速创建分支，并切换到创建好的分支下：  
``` git checkout -b Branch_Name ```  
等同于下面两条指令：  

``` git branch Branch_Name
    git checkout Branch_Name ```

- 合并分支：  

``` git checkout master
    git merge other_branch_name ```  

不同的分支合并情况：
  1. 没有冲突的合并，如果某个分支比master分支向前移动了，而且主分支master可以向前移动到达这个修改过的分支上，那么就直接 merge 就可以了。这种情况下合并操作没有需要解决的分歧----这种叫做"快进(fast-forward)"
  2. 如果此时你想合并第三个分支，而master分支已经向前移动了，不在最初的创建这个第三个分支的地方了，而且你在这个第三个分支上做了很多修改，也向前移动了。这种情况下，git会找到两个分支的工作祖先，然后进行合并
  3. 遇到冲突时的分支合并：一般是在不同的分支下修改了相同的文件才会导致这个情况的出现。可以在合并冲突后的任意时刻使用```git status```命令查看哪些文件因为合并冲突而处于未合并(unmerged)状态的文件。任何因包含合并冲突而有待解决的文件，都会以未合并状态标识出来。遇到冲突后手动修改冲突。

- 删除分支：  

``` git branch -d Branch_Name ```

- 查看分支列表：  

``` git branch ```  

``` --merged ```和``` --no-merged ```这个两个参数可以帮我们区分哪些分支是合并了哪些还没有合并

- 查看git log的有用指令：  

``` git log --oneline --decorate ```  
``` git log --oneline --decorate --graph --all ```

- git的 HEAD指针：  
git有一个HEAD指针，指向当前所在的本地分支  

- git 远程分支：  
如果要同步本地的工作，运行```git fetch origin``` 命令。这个命令查找"origin"是哪一个服务器，从中抓取本地没有的数据，并且更新本地数据库，移动 origin/master 指针指向新的，更新后的位置  

- 关于git pull指令：  
其实，git pull 指令相当于执行了下面两个指令：git fetch 紧跟着 git merge.  
git pull 会查找当前分支所跟踪的服务器与分支，从服务器上抓取数据然后尝试合并入那个远程分支。  
可以尝试用 git fetch和git merge 代替 git pull，使得命令的意思更清晰

  ![img](http://i4.buimg.com/1949/bef4fb905764d472.png)

### GIT分支-分支的新建和合并  

- 创建分支的场景：  
  1. 开发某个网站
  2. 为实现某个新的功能或者模块，创建一个分支
  3. 在分支上开展工作  
- 正在这个时候，你突然需要去解决一个紧急的bug，你会做下面的事情：  
  1. 切换到你的线上分支(production branch)
  2. 为这个紧急的问题新建一个分支，并在其中修复这个问题
  3. 在测试通过之后，切换回线上分支，然后合并这个修补分支，最后将改动推送到线上分支
  4. 切换回最初工作的分支上，继续开发

### GIT .gitignore文件

在git中可以声明.gitignore文件来告诉它在检查文件的时候，忽略我们制定的文件.一般有两种方式，一种是在本地项目中建立一个.gitignore文件，一种是在系统全局中创建.gitignore文件

### git 分支

- 跟踪分支

跟踪远程分支

checkout

快速创建分支且切换到新建的分支下：

``` git checkout -b new_branch ```

合并分支：

``` git merge branch_name ```

将新分支发不到 远端,推送本地分支

``` git push origin new_branch ```

删除远程分支：

``` git push origin :remote/new_branch 	```

例如我想删除远程的一个叫做next的分支、就可以用下面的指令：

``` git push origin :next ```



### git 开发工作流程

长期分支

- 仅在master分支中保留完全稳定的代码、即已经发布或即将发布的代码。与此同时、还会有一个名为develop或next的平行分支、专门用于后续开发、或仅用于稳定性测试

一旦进入了一种相对稳定的状态、就可以将代码何如到master

这样、在确保这些已完成的特性分支能够通过所有测试、并且不会引入更多的错误之后、就可以并入到主干中、等待下一次的发布

特性分支

在任何规模的项目中都可以使用特性分支(topic)、一个特性分支是指一个短期的、用来实现单一特性或与其相关工作的分支。

以上那些操作分支、都是本地仓库的分支、暂时完全不涉及域服务器的交互

### 远程分支(remote branch)

远程分支是对远程仓库的分支的索引；他们是一些无法移动的本地分支；只有在git进行网络交互的时候才会更新

我们用 (远程仓库名)/(分支名)这样的形式表示远程分支。比如我们想看看上次同origin仓库通讯时master分支的样子、就应该查看origin/master分支。


