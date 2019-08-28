
module.exports = function (plop) {


    plop.setGenerator('component', {
        description: '视图组件',
        prompts: [{
            type: 'input',
            name: 'name',
            message: '组件的名字, 如MyApp',
            validate: function (value) {
                if ((/([A-Z][a-z]+)+/).test(value)) { return true; }
                return '组件名称必须为驼峰形式';
            }
        }],
        actions: [
            /**
             * TemplateComponent.js
             */
            {
                type: 'add',
                path: 'src/component/{{name}}/{{name}}.js',
                templateFile: 'templates/components/TemplateComponent.js'
            },
            {
                type: 'modify',
                path: 'src/component/{{name}}/{{name}}.js',
                pattern: /TemplateComponent/g,
                template: '{{name}}'
            },
            {
                type: 'modify',
                path: 'src/component/{{name}}/{{name}}.js',
                pattern: /template-component/g,
                template: '{{dashCase name}}'
            },
            /**
             * template-component.scss and css
             */
            {
                type: 'add',
                path: 'src/component/{{name}}/{{dashCase name}}.css',
                templateFile: 'templates/components/template-component.css'
            },{
                type: 'modify',
                path: 'src/component/{{name}}/{{dashCase name}}.css',
                pattern: /TemplateComponent/g,
                template: '{{dashCase name}}'
            },
            {
                type: 'modify',
                path: 'src/component/{{name}}/{{dashCase name}}.css',
                pattern: /template-component/g,
                template: '{{dashCase name}}'
            },
        ]
    });

    plop.setGenerator('router', {
        description: '路由生成器',
        prompts: [{
            type: 'list',
            name: 'rootPath',
            message: '生成路由的目录',
            choices: [
                'spartaRoutes',
                'yunduanRoutes',
                'zhikeRoutes'
            ]
        }, {
            type: 'input',
            name: 'routerPath',
            message: '路由的名字, 全部小写，用下划线分词 如：orders'
        }],
        actions: function(data){
            console.log(data);

            return [{
                // 配置路由文件
                type: 'modify',
                path: 'src/{{rootPath}}/index.js',
                pattern: /\/\/ generator import/,
                template: "import {{pascalCase routerPath }} from './{{ routerPath }}';\n// generator import"
            }, {
                type: 'modify',
                path: 'src/{{rootPath}}/index.js',
                pattern: /{ \/\* generator router \*\/ }/,
                template: '<Route path="/{{ routerPath }}"         component={ {{pascalCase routerPath}} }           desc="TODO: 该路由描述" />\n      { /* generator router */ }'
            }, {
                // 配置路由内容
                type: 'add',
                path: 'src/{{rootPath}}/{{routerPath}}/index.js',
                templateFile: 'templates/router/index.js'
            }, {
                type: 'add',
                path: 'src/{{rootPath}}/{{routerPath}}/{{pascalCase routerPath}}List.js',
                templateFile: 'templates/router/list.js'
            }, {
                type: 'add',
                path: 'src/{{rootPath}}/{{routerPath}}/{{pascalCase routerPath}}Detail.js',
                templateFile: 'templates/router/detail.js'
            }];
        }
    });
};
