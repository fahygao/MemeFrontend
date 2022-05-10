import React, { useEffect } from "react";
import NavbarComp from "../../components/Header/NavbarComp";
import "./AboutPage.css";

function About() {
  useEffect(() => {
    let w = document.documentElement.clientWidth || window.innerWidth;
    if (w <= 750) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
    //  document.body.style.overflow = "hidden";
  }, []);

  return (
    <div>
      <NavbarComp />
      <section className="about-page">
        <div className="left-about">
          <div className="communityStandards">
            <div className="title-about">用户守则</div>

            <div className="content-about">
              <p>
                欢迎来到么么！这里是属于留学生的纯文字内容社区。么么旨在支持会表达的人表达，鼓励想表达的人表达，从而让不敢表达的人有机会说几句。
              </p>
            </div>
          </div>
        </div>
        <div className="right-about">
          <section id="point1-about">
            <div className="title1-about"> 在么么 </div>
            <div className="content1-about">
              <ul>
                <li>鼓励大家在对应话题下分享你的想法，你的每一次表达没准就可以让与你相似的他们发现你并结识。</li>
                <li>通过匿名的方式，没人知道你是谁，你可以无压力的诉说实名不敢讲、不想讲的心事。</li>
                <li>每一个留学在外的灵魂都值得被治愈，和陌生人温暖相遇后，别忘记传递更多的温暖。么么相信，每一个灵魂都能得到温暖回应；你的一句回复，便会拯救一个“孤独”的灵魂。</li>
              </ul>
            </div>
          </section>
          <section id="point2-about">
            <div className="title2-about"> 么么提醒 </div>
            <div className="content2-about">
              <p>
                网线另一端也是活生生的人；有时，人与人之间的喜怒哀乐会互不相通，在想要对其他三观不同的人进行评价时，请记得保持尊重。
              </p>
            </div>
          </section>
          <section id="point3-about">
            <div className="title3-about"> 么么拒绝 </div>
            <div className="content3-about">
              <p>
                钓鱼、低俗擦边、攻击引战、歧视与仇恨（种族、民族、地域、性别等）、地图炮（针对某个群体的言语攻击）、广告引流等不符合倾诉氛围的内容；这些内容在么么都会被屏蔽处理哦。
              </p>
            </div>
          </section>
          <section id="point4-about">
            <div className="title4-about"> 么么提倡 </div>
            <div className="content4-about">
              <p>
                对于社交平台上的发言，如果以截图（Image Post）的形式转载，公众人物和机构的发言可以直接转发，但非公众人物（没有加 V 的普通网友或小范围的网红）的发言，其帖文和评论中的所有 ID 都需要打码处理。不要以「奇文共赏」、「欢乐群嘲」为目的恶意转发其他社区的评论。
              </p>
            </div>
          </section>
          <section id="point5-about">
            <div className="title5-about"> 么么希望 </div>
            <div className="content5-about">
              <p>
                成为留学生的首选内容社区，成为一个让绝大多数留学生放心倾诉心事和分享喜怒哀乐的地方。
              </p>
            </div>
          </section>
          <section>
            <div className="title6-about"> 么么 陪大家一起成长。 </div>
          </section>
        </div>
      </section>
    </div>
  );
}


export default About;
