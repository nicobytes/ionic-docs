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
      <div class="framework-toggle">
        <a class="framework-toggle__prefix" href="/docs">Docs</a>
        <a class="framework-toggle__select" onClick={dropdown.toggle}>
          {dropdown.selected.title}
          <svg viewBox="0 0 33 22"><polygon points="16.5 22 0 0 33 0"></polygon></svg>
        </a>
      </div>,
      <ul class={{ 'framework-panel': true, 'is-active': dropdown.isOpen }}>
        { dropdown.items.map(item => 
          <li class={{
            'framework-dropdown-item': true,
            'is-external': item.external,
            'is-active': dropdown.selected === item
          }}>{ this.renderFrameworkDropdownItem(item, dropdown) }</li>
        )}
      </ul>
    ];
  }

  renderFrameworkDropdownItem = (item, dropdown) => {
    if (item.external) {
      return (
        <a href={item.url} target="_blank">
          <strong>{ item.title }</strong>
          <span>{ item.subtitle } <NewTab/></span>
        </a>
      );
    }
    return (
      <stencil-route-link
        url={item.url}
        onClick={() => dropdown.select(item)}>
          <strong>{ item.title }</strong>
          <span>{ item.subtitle }</span>
      </stencil-route-link>
    );
  }

  renderEcosystemDropdown = dropdown => {
    return [
      <a class="ecosystem-toggle" onClick={dropdown.toggle}>
        Ecosystem
        <svg viewBox="0 0 33 22"><polygon points="16.5 22 0 0 33 0"></polygon></svg>
      </a>,
      <ul class={{ 'ecosystem-panel': true, 'is-active': dropdown.isOpen }}>
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
    className: 'framework'
  },
  {
    title: 'Pro',
    subtitle: 'Integrated suite of tools & services for shipping apps',
    url: '/docs/pro',
    className: 'pro'
  },
  {
    title: 'CLI',
    subtitle: 'Ionic command line interface tool',
    url: '/docs/cli',
    className: 'cli',
  },
  {
    title: 'Capacitor',
    subtitle: 'Cross-platform Native SDK Container',
    url: 'https://capacitor.ionicframework.com/',
    className: 'capacitor',
    external: true
  },
  {
    title: 'Stencil',
    subtitle: 'Reusable web component compiler',
    url: 'https://stenciljs.com/',
    className: 'stencil',
    external: true
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

