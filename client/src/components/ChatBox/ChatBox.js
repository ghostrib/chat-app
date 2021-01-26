import React from 'react';
import s from './chatbox.module.scss';
const ChatBox = () => {
  return (
    <main className={s.main}>
      <ul className={s.main__list}>
        <li className={s.container__user}>
          <div className={s.user}>
            <div className={s.user__name}>I_AM_COLOSSUS</div>
            <div className={s.user__message}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Iste cumque molestias tempore adipisci minima odio
              nesciunt aut minus possimus dolore vel deserunt nemo,
              natus expedita. Tenetur excepturi eum error harum. Lorem
              ipsum dolor, sit amet consectetur adipisicing elit.
              Totam eos et eius nemo quos quas debitis odio,
              reiciendis eum vero cum. Odit nisi iure assumenda
              doloremque eligendi, totam est exercitationem.
            </div>
          </div>
        </li>
        <li className={s.container__user}>
          <div className={s.user}>
            <div className={s.user__name}>I_AM_COLOSSUS</div>
            <div className={s.user__message}>
              Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Quia labore, maiores facere cum doloremque
              dignissimos nihil assumenda architecto fugit impedit
              magni voluptas aut expedita iusto beatae, dolorum dolor
              mollitia vitae! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Consectetur deserunt iusto
              voluptatibus reprehenderit aliquam? Dolore tenetur
              repudiandae quibusdam adipisci, itaque ipsam explicabo
              officiis numquam, maiores odio voluptates eius voluptas.
              Illum?
            </div>
          </div>
        </li>
        <div></div>
      </ul>
    </main>
  );
};

export default ChatBox;
