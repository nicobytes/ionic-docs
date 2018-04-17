import { Component, Prop } from '@stencil/core';
import { SECTION_FRAMEWORK, SECTION_CLI } from '../../constants';
import { Close, Ionic, Menu, NewTab } from '../../icons';

@Component({
  tag: 'site-header',
  styleUrl: 'site-header.scss',
  shadow: true
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
              { item.category ? null : <NewTab/> }
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
          class={{ 'nav-toggle': true, 'is-open': this.isMenuOpen }}>
            { this.isMenuOpen ? <Close/> : <Menu/> }
        </button>
        <a href="/docs" class="docs-logo"><Ionic/></a>
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
        <a href={this.getGithubLink()} class="github-link" target="_blank">GitHub<NewTab/></a>
      </nav>
    );
  }
}

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

