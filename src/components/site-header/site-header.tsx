import { Component, Prop } from '@stencil/core';
import { SECTION_FRAMEWORK, SECTION_CLI } from '../../constants';

const CloseIcon = () => (
  <svg viewBox="0 0 54 54">
    <rect transform="rotate(45 27 27)" y="22" width="54" height="10" rx="2"/>
    <rect transform="rotate(-45 27 27)" y="22" width="54" height="10" rx="2"/>
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 54 54">
    <rect y="0" width="54" height="10" rx="2"/>
    <rect y="22" width="54" height="10" rx="2"/>
    <rect y="44" width="54" height="10" rx="2"/>
  </svg>
);

const NewTabIcon = () => (
  <svg class="new-tab" viewBox="0 0 43 42">
    <rect class="new-tab__box" y="8" width="34" height="34" rx="6"/>
    <path class="new-tab__arrow" d="M37.078 3.268H23.617V.243h18.626v18.625h-3.026V5.407L16.13 28.494l-2.14-2.139z"/>
  </svg>
);

const IonicLogo = () => (
  <svg viewBox="0 0 144 144">
    <title>Ionic</title>
    <path d="M72 39c18.183 0 33 14.817 33 33s-14.79 33-33 33-33-14.817-33-33c0-18.21 14.817-33 33-33zm46.5 2c-8.008 0-14.5-6.492-14.5-14.5S110.492 12 118.5 12 133 18.492 133 26.5 126.508 41 118.5 41zm19.031 1.16C141.834 51.58 144 61.621 144 72c0 39.713-32.287 72-72 72-39.712 0-72-32.287-72-72C0 32.288 32.288 0 72 0c11.616 0 22.725 2.7 32.99 7.987l1.35.704-1.18.956c-2.897 2.334-5.204 5.344-6.638 8.719l-.394.928-.928-.45c-7.903-3.769-16.397-5.682-25.2-5.682-32.428 0-58.837 26.41-58.837 58.838s26.353 58.81 58.809 58.81c32.456 0 58.837-26.41 58.837-58.838a58.49 58.49 0 0 0-4.5-22.556l-.393-.928.956-.366a22.562 22.562 0 0 0 9.028-6.216l1.012-1.125.62 1.378-.001.001z" fill-rule="nonzero"/>
  </svg>
);

const frameworkDropdownItems = [
  {
    title: 'Framework',
    subtitle: 'The UI Toolkit for building highly performant apps',
    url: '/docs',
    category: 'framework',
    className: 'framework'
  },
  {
    title: 'Pro',
    subtitle: 'Integrated suite of tools & services for shipping apps',
    url: '/docs/pro',
    category: 'pro',
    className: 'pro'
  },
  {
    title: 'CLI',
    subtitle: 'Ionic command line interface tool',
    url: '/docs/cli',
    category: 'cli',
    className: 'cli',
    small: true
  },
  {
    title: 'Capacitor',
    subtitle: 'Cross-platform Native SDK Container',
    url: 'https://capacitor.ionicframework.com/',
    className: 'capacitor',
    small: true
  },
  {
    title: 'Stencil',
    subtitle: 'Reusable web component compiler',
    url: 'https://stenciljs.com/',
    className: 'stencil',
    small: true
  }
];

const ecosystemDropdownItems = [
  {
    text: 'Forum',
    url: 'https://forum.ionicframework.com/',
    className: 'forum'
  },
  {
    text: 'Chat',
    url: 'https://ionicworldwide.herokuapp.com/',
    className: 'chat'
  },
  {
    text: 'Blog',
    url: 'https://blog.ionicframework.com/',
    className: 'blog'
  },
  {
    text: 'Twitter',
    url: 'https://twitter.com/Ionicframework',
    className: 'twitter'
  },
  {
    text: 'Stack',
    url: 'https://stackoverflow.com/questions/tagged/ionic-framework',
    className: 'stack-overflow'
  },
  {
    text: 'Swag',
    url: 'https://shop.ionicframework.com/',
    className: 'swag'
  }
];

@Component({
  tag: 'site-header',
  styleUrl: 'site-header.scss'
})
export class SiteHeader {
  @Prop() currentSection: string;
  @Prop() onToggleClick: () => void;
  @Prop() isMenuOpen: boolean;

  renderFrameworkDropdown = dropdown => {
    return [
      <a class="current" onClick={dropdown.toggle}><strong>Docs</strong> {dropdown.selected.title}</a>,
      <ul class={{ 'active': dropdown.isOpen }}>
        {dropdown.items.map(item =>
          <li class={{
            [item.className]: true,
            'active': dropdown.selected === item,
            'sm': item.small
          }}>
            <a href={item.url}>
              <strong>{item.title}</strong>
              <span>{item.subtitle}</span>
              { item.category ? null : <NewTabIcon/> }
            </a>
          </li>
        )}
      </ul>
    ];
  }

  renderEcosystemDropdown = dropdown => {
    return [
      <a class="current" onClick={dropdown.toggle}>Ecosystem</a>,
      <ul class={{ 'active': dropdown.isOpen }}>
        {dropdown.items.map(item => (
          <li class={item.className}>
            <a href={item.url} target="_blank">{item.text}</a>
          </li>
        ))}
      </ul>
    ];
  }

  getGithubLink() {
    switch (this.currentSection) {
      case SECTION_CLI:
        return "https://github.com/ionic-team/ionic-cli";
      case SECTION_FRAMEWORK:
      default:
        return "https://github.com/ionic-team/ionic";
    }
  }

  render() {
    return (
      <nav>
        <button
          onClick={this.onToggleClick}
          class={{ 'site-nav-toggle': true, 'is-open': this.isMenuOpen }}>
            { this.isMenuOpen ? <CloseIcon/> : <MenuIcon/> }
        </button>
        <a href="/docs" id="site-logo"><IonicLogo/></a>
        <ctrl-dropdown
          class="framework-dropdown"
          autoClose
          items={frameworkDropdownItems}
          renderer={this.renderFrameworkDropdown}/>
        <site-search/>
        <ctrl-dropdown
          class="ecosystem-dropdown"
          autoClose
          items={ecosystemDropdownItems}
          renderer={this.renderEcosystemDropdown}/>
        <a href={this.getGithubLink()} class="github" target="_blank">GitHub <NewTabIcon/></a>
      </nav>
    );
  }
}
