/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';
import { createSignal, For, JSX, Show } from 'solid-js';
import { clsx } from 'clsx'

type Props = JSX.HTMLAttributes<HTMLDivElement>;

const blurStyle = 'bg-opacity-50 backdrop-blur backdrop-filter'
const [getCurrentPage, setCurrentPage] = createSignal('home');
const isDrawerSticky = () => getCurrentPage() !== 'home';
const [isDrawerOpen, setDrawerOpen] = createSignal(false);

const App = () =>
  <div class={clsx('drawer antialiased max-w-6xl mx-auto md:h-screen', isDrawerSticky() && "drawer-mobile")}>
    <input id='drawer' type='checkbox' class='drawer-toggle' checked={isDrawerOpen()} />
    <div class='drawer-content flex flex-col'>
      <Header class={clsx('navbar top-0 sticky w-full bg-base-300', blurStyle)} />
      <Content class='p-6 flex flex-col gap-5' />
      <Footer class="footer footer-center text-base-content pt-10 pb-4" />
    </div>
    <Drawer class='drawer-side' />
  </div>;

const Drawer = (props: Props) =>
  <div {...props}>
    <label for='drawer' class='drawer-overlay' />
    <ul class={clsx('menu p-4 overflow-y-auto w-80 bg-base-100 gap-3', blurStyle)}>
      <Links />
    </ul>
  </div>

const DrawerToggler = (props: Props) =>
  <div {...props}>
    <label class='btn btn-square btn-ghost' onClick={() => setDrawerOpen(!isDrawerOpen())}>
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' class='inline-block w-6 h-6 stroke-current'>
        <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 6h16M4 12h16M4 18h16' />
      </svg>
    </label>
  </div>

const Header = (props: Props) =>
  <header {...props}>
    <DrawerToggler class='flex-none lg:hidden' />
    <div class='flex-1 px-2 mx-2' textContent="Logo" />
    <div class='flex-none hidden lg:block'>
      <Show when={!isDrawerSticky()}>
        <ul class='menu menu-horizontal gap-2' children={<Links />} />
      </Show>
    </div>
  </header>

const Footer = (props: Props) =>
  <footer {...props} children={
    <>
      <p>Copyright © 2022</p>
      <p>All right reserved</p>
      <p>MVP</p>
    </>}
  />

const Content = (props: Props) =>
  <>
    <Show when={getCurrentPage() === 'home'} children={<Pages.Home {...props} />} />
    <Show when={getCurrentPage() === 'docs'} children={<Pages.Docs {...props} />} />
    <Show when={getCurrentPage() === 'about'} children={<Pages.About {...props} />} />
  </>

const Links = () => {
  const isLinkActive = (name: string) => getCurrentPage() === name;
  const onLinkClick = (name: string) => () => {
    setDrawerOpen(false);
    setCurrentPage(name);
  };

  return (
    <For each={['home', 'docs', 'about']}
      children={(name) =>
        <li class='capitalize' onClick={onLinkClick(name)} >
          <a class={clsx(isLinkActive(name) && "active")} textContent={name} />
        </li>
      }
    />
  )
}


const Pages = {
  Home: (props: Props) => {
    let cardStyle = 'h-80 flex justify-center items-center shadow-lg rounded-2xl text-xl font-light'
    return (
      <div {...props}>
        <div class={`bg-base-100 ${cardStyle} `}>Slide 1</div>
        <div class={`bg-base-200 ${cardStyle}`}>Slide 2</div>
        <div class={`bg-base-300 ${cardStyle}`}>Slide 3</div>
        <div class={`bg-black ${cardStyle}`}>Slide 3</div>
      </div>
    )
  },
  Docs: (props: Props) =>
    <div {...props}>
      <h1 class='text-2xl font-bold' textContent='Getting Started' />
      <p textContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
    </div>,
  About: (props: Props) =>
    <div {...props}>
      <h1 class='text-2xl font-bold' textContent='About Us' />
      <Pages.Home {...props} />
    </div>
}
render(() => <App />, document.getElementById('root'));
