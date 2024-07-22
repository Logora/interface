---
description: A component to display and interact with suggestions..
labels: ['suggestion']
---

A component to display and interact with suggestions.
It can be shown in a normal state or a disabled state, with different styles and interactions depending on its status.

### Component usage
```js
    import { SuggestionBox } from '@logora.debate/suggestion/suggestion_box';
```
```js

const suggestion = {
    id: 414,
    created_at: "2024-02-07T10:34:16.888Z",
    expires_at:"",
    total_upvotes:0,
    total_downvotes:0,
    is_accepted:false,
    is_expired:false,
    is_published:false,
    group:{
      slug:"default-slug"
    },
    author: {
        id:120
        full_name: "John Doe",
        image_url: "https://example.com/avatar.jpg",
    },
};

  <SuggestionBox
    suggestion={suggestion}
    disabled={false}
  />
```