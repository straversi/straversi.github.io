---
layout: post
title:  "Constraint Satisfaction With Sudoku"
date:   2015-12-3 11:47:36 -0800
description: "Solving sudoku using constraint satisfaction."
---

The permalink format for posts on this site is `:categories/:title`. That way I can direct students to steven.codes/cs10 for easy access to all cs10 resources.

## Organizing Assets
I prefer to structure assets similarly to posts. For example, if there is a post at `site.baseurl/cs10/2048-merge`, then I'd like the corresponding assets to be stored in `assets/posts/cs10/2048-merge`. This means I have to go through this path every time I'd like to include a resource. [Asset path tag](https://github.com/samrayner/jekyll-asset-path-plugin) is a plugin that I use to manage these relative paths. This is what including an image looks like with asset path:

{% highlight liquid %}
{% raw %}
{% asset_path cat_of_the_month.png %}
{% endraw %}
{% endhighlight %}

Many of my posts require custom JavaScript, and sometimes custom CSS (see [2048 Merge]({% post_url 2015-11-12-2048-merge %})). I don't want these custom resources loading for every post, so I created two front matter variables, `custom_css` and `custom_js`. In `_includes/header.html`, I added the following script:

{% highlight html %}
{% raw %}
{% if page.custom_css %}
  {% for stylesheet in page.custom_css %}
    <link rel="stylesheet" href="{% asset_path {{ stylesheet }}.css %}" media="screen" type="text/css">
  {% endfor %}
{% endif %}

{% if page.custom_js %}
  {% for js_file in page.custom_js %}
    <script src='{% asset_path {{ js_file }}.js %}' type="text/javascript"></script>
  {% endfor %}
{% endif %}
{% endraw %}
{% endhighlight %}

Some JavaScript snippets need access to the assets of the post. It would be bad practice to include file paths in the JavaScript itself. To allow for better separation of concerns, I pass asset_path to the js from the post. An example:

{% highlight html %}
{% raw %}
<script>
  tileSetup("{% asset_path 2048_tiles/%}");
</script>
{% endraw %}
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll.

[jekyll-docs]: http://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
