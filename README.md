# gatsby-use-fusejs

`gatsby-use-fusejs`✨ is a React hook package to search with [Fuse.js](https://fusejs.io/) index in [Gatsby.js](https://www.gatsbyjs.com/) project. This package also provide built-in **debounce** feature.

https://www.npmjs.com/package/gatsby-use-fusejs

> ⛔️ Warning
> this package should be used with [gatsby-plugin-fusejs](https://www.gatsbyjs.com/plugins/gatsby-plugin-fusejs/)

## 🚀 Install

```shell
yarn add gatsby-use-fusejs
```

```shell
npm install gatsby-use-fusejs
```

## 📕 Usage

### `useFuseSearch`

```JSX
import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useFuseSearch } from 'gatsby-use-fusejs';
import * as S from './styles';

const SearchInput = () => {
	const { fusejs } = useStaticQuery(graphql`
		{
			fusejs {
				index
				data
			}
		}
	`);
	const [query, setQuery] = useState('');
	const result = useFuseSearch({ query, fusejs });

	return (
		<S.SearchInput>
			<S.Input
				type="text"
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
			{!!result.length && (
				<S.searchBox>
					{result.map(({ item }: { item: any }) => (
						<div key={item.id}>{item.title}</div>
					))}
				</S.searchBox>
			)}
		</S.SearchInput>
	);
};

export default SearchInput;
```

#### arguments

-   query: string for search query
-   fusejs: fusejs object from graphQL query (a fusejs object is generated by `gatsby-plugin-fusejs`)
-   fuseOpts?: [Fuse.IFuseOptions](https://fusejs.io/api/options.html)
-   searchOpts?: Fuse.FuseSearchOptions

### `useDebounceFuseSearch`

```JSX
import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useDebounceFuseSearch } from 'gatsby-use-fusejs';
import * as S from './styles';

const SearchInput = () => {
	...

	// default delay value is 500ms
	const result = useDebounceFuseSearch({ query, fusejs, delay: 1000 });

	...
};

export default SearchInput;
```

#### arguments

-   all arguments from `useFuseSearch` API
-   delay?: delay time(ms) for debouncing

## ⛓️ Dependencies

-   `fuse.js`: ^6.6.2
-   `react`: ^18.2.0
