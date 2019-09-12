import history from '../../history';
const list = [
  {
    key: 'sub2',
    icon: 'question-circle',
    label: 'Questions',
    menuList: [
      {
        key: '/questions',
        onClick: () => history.push('/questions'),
        label: 'List'
      }
    ],
    accessGroup: [1, 10]
  },
  {
    key: 'simulation',
    icon: 'smile',
    label: 'Simulation',
    menuList: [
      {
        key: '/simulation',
        onClick: () => history.push('/simulation'),
        label: 'List'
      },
      {
        key: '/simulation/map',
        onClick: () => history.push('/simulation/map'),
        label: 'Map Simulation'
      }
    ],
    accessGroup: [1]
  },
  {
    key: 'comprehension',
    icon: 'unordered-list',
    label: 'Comprehension',
    menuList: [
      {
        key: '/comprehension',
        label: 'List',
        onClick: () => history.push('/comprehension')
      },
      {
        key: '/comprehension/upload',
        label: 'Upload',
        onClick: () => history.push('/comprehension/upload')
      }
    ],
    accessGroup: [1]
  },
  {
    key: 'article',
    icon: 'file-text',
    label: 'Article',
    menuList: [
      {
        key: '/article',
        label: 'List',
        onClick: () => history.push('/article')
      }
    ],
    accessGroup: [1, 10]
  },

  {
    key: 'master',
    icon: 'table',
    label: 'Master Table',
    menuList: [
      {
        key: '/categories',
        label: 'Category',
        onClick: () => history.push('/categories')
      },
      {
        key: '/parameters',
        label: 'Parameter',
        onClick: () => history.push('/parameters')
      },
      {
        key: '/tags',
        label: 'Tags',
        onClick: () => history.push('/tags')
      },
      {
        key: '/modules',
        label: 'Modules',
        onClick: () => history.push('/modules')
      },
      {
        key: 'organizations',
        icon: 'bank',
        label: 'Organizations',
        onClick: () => history.push('/organization')
      },
      {
        key: '/services',
        label: 'Services',
        onClick: () => history.push('/services')
      }
    ],
    accessGroup: [1]
  },
  {
    key: 'dictionary',
    icon: 'table',
    label: 'Dictionary',
    menuList: [
      {
        key: '/jargons',
        label: 'Jargons',
        onClick: () => history.push('/jargons')
      },
      {
        key: '/keywords',
        label: 'Keywords',
        onClick: () => history.push('/keywords')
      }
    ],
    accessGroup: [1]
  },
  {
    key: 'flashcards',
    icon: 'credit-card',
    label: 'Flash Cards',
    menuList: [
      {
        key: '/flashcard',
        label: 'List',
        onClick: () => history.push('/flashcard')
      },
      {
        key: '/flashcard/add',
        label: 'Add',
        onClick: () => history.push('/flashcard/add')
      },
      {
        key: '/flashcard/map',
        label: 'Map',
        onClick: () => history.push('/flashcard/map')
      }
    ],
    accessGroup: [1, 10]
  },
  {
    key: 'psychometric',
    icon: 'appstore',
    label: 'Psychometric',
    menuList: [
      {
        key: '/traits',
        label: 'Traits',
        onClick: () => history.push('/traits')
      },
      {
        key: '/map/traits',
        label: 'Map Traits',
        onClick: () => history.push('/map/traits')
      },
      {
        key: '/options',
        label: 'Options',
        onClick: () => history.push('/options')
      }
    ],
    accessGroup: [1]
  },
  {
    key: 'mapping',
    icon: 'heat-map',
    label: 'Mapping',
    menuList: [
      {
        key: '/map/module-parameter',
        label: 'Module-Parameter Mapping',
        onClick: () => history.push('/map/module-parameter')
      },
      {
        key: '/map/organization-service',
        label: 'Organization-Service Mapping',
        onClick: () => history.push('/map/organization-service')
      },
      {
        key: '/map/service-module',
        label: 'Service-Module Mapping',
        onClick: () => history.push('/map/service-module')
      }
    ],
    accessGroup: [1]
  }
];

const subMenuList = userAccessGroup => {
  let tempList = [];
  list.map(obj => {
    console.log(obj);
    if (obj.accessGroup.includes(parseInt(userAccessGroup))) {
      tempList.push(obj);
    }
  });
  return tempList;
};

export default subMenuList;
