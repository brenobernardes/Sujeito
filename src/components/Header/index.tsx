import styles from './styles.module.scss';
import Image from 'next/image';
import logo from '../../../public/images/logo.svg';

import ActiveLink from '../ActiveLink';

export default function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <ActiveLink activeClassName={styles.active} href="/">
                    <a>
                    <Image src={logo} alt='Sujeito Programador Logo'/>
                    </a>
                </ActiveLink>

                <nav>
                    <ActiveLink activeClassName={styles.active} href='/'>
                        <a>Home</a>
                    </ActiveLink>

                    <ActiveLink activeClassName={styles.active} href='/posts'>
                        <a>Conteúdos</a>
                    </ActiveLink>

                    <ActiveLink activeClassName={styles.active} href='/sobre'>
                        <a>Quem somos</a>
                    </ActiveLink>
                </nav>

                <a className={styles.readyButton} type='button' href='https://sujeitoprogramador.com'>Começar</a>
            </div>
        </header>
    )
}