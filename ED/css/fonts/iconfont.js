;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-daoru" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M1003.403 212.089c-185.792-93.452-310.496-13.652-441.181 215.545l116.429 68.057c8.339 4.859 13.395 13.837 12.287 23.308-0.369 3.067-1.318 6.074-2.857 8.704-2.921 5.193-7.972 9.149-14.269 10.688l-332.307 128.357c-12.588 3.216-25.831-4.539-29.419-17.115l-57.22-356.155c-2.625-9.218 0.582-19.028 8.045-24.654 7.538-5.666 17.701-5.783 26.061-0.878l118.62 69.302c133.184-233.474 318.546-386.345 595.818-151.036v25.908z"  ></path>' +
    '' +
    '<path d="M853.522 966.915h-674.403c-82.766 0-149.861-67.111-149.861-149.865v-599.46c0-82.766 67.095-149.861 149.861-149.861h149.865v70.251h-149.865c-41.422 0-74.937 33.555-74.937 74.937v608.835c0 41.408 33.518 74.937 74.937 74.937h674.406c41.349 0 74.937-33.518 74.937-74.937v-379.355h74.937v374.665c-0.001 82.763-67.116 149.861-149.881 149.861z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-key" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M890.525538 112.876308a334.769231 334.769231 0 0 0-473.403076 4.804923c-117.838769 120.201846-126.267077 306.412308-27.254154 436.539077l-73.334154 74.830769-65.063385-63.763692a37.730462 37.730462 0 0 0-53.366154 0.551384l-7.561846 7.68a37.730462 37.730462 0 0 0 0.551385 53.366154l65.063384 63.763692-30.168615 30.79877-95.862154-93.932308a37.769846 37.769846 0 0 0-53.366154 0.551385l-7.561846 7.68a37.730462 37.730462 0 0 0 0.551385 53.366153l95.862154 93.932308-98.776616 100.785231a70.340923 70.340923 0 0 0 100.509539 98.461538l329.452307-336.187077c128.078769 69.513846 291.485538 49.427692 398.572308-59.82523a334.808615 334.808615 0 0 0-4.844308-473.403077z m-100.233846 376.832a192.157538 192.157538 0 1 1-274.471384-268.996923 192.157538 192.157538 0 0 1 274.471384 268.996923z" fill="#D8D8D8" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-user" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M653.705846 430.395077a237.725538 237.725538 0 0 0 74.870154-111.261539 19.180308 19.180308 0 0 0 8.940308 2.520616c25.875692 0 46.867692-60.691692 46.867692-86.961231s-20.992-47.576615-46.867692-47.576615c-2.008615 0-3.741538 0.905846-5.671385 1.181538a237.607385 237.607385 0 0 0-229.927385-178.412308 237.607385 237.607385 0 0 0-230.006153 178.688c-2.323692-0.433231-4.489846-1.496615-6.971077-1.496615-25.875692 0-46.867692 21.307077-46.867693 47.576615s20.992 86.961231 46.867693 86.961231a19.692308 19.692308 0 0 0 10.121846-3.229538 237.804308 237.804308 0 0 0 75.145846 111.970461c-162.619077 58.407385-278.488615 207.478154-278.488615 382.621539 0 226.067692 192.630154 178.569846 430.276923 178.569846 237.607385 0 430.276923 47.458462 430.276923-178.569846-0.039385-175.143385-115.908923-324.174769-278.567385-382.582154z" fill="#D8D8D8" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiazai" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M619.008 96H300.192C209.664 96 128 170.528 128 258.304v606.464C128 952.576 209.664 1024 300.192 1024h318.848L800 864.768V258.304C800 170.528 709.568 96 619.008 96zM768 775.744V864h-160v128H300.192C228.416 992 160 934.368 160 864.768V258.304C160 188.736 228.416 128 300.192 128h318.848C690.784 128 768 188.736 768 258.304v517.44z" fill="#231815" ></path>' +
    '' +
    '<path d="M755.296 0H256v32h499.296C827.04 32 896 89.632 896 159.2V864h32V159.2C928 71.424 845.824 0 755.296 0z" fill="#231815" ></path>' +
    '' +
    '<path d="M685.696 320h-97.984l-81.568 108.672c-11.232 14.848-23.52 31.392-36.896 50.624a1386.56 1386.56 0 0 0-33.728-51.264L361.28 320H258.752l163.584 214.848L245.536 768h99.328l127.136-176.032 26.432 35.36L597.76 768h100.736l-180-237.536L685.696 320z" fill="#1B8E42" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-guanbi" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M582.7584 523.5456L906.8032 199.5008c20.4288-20.4288 22.016-51.9168 3.584-70.3744-18.432-18.432-49.9456-16.8448-70.3744 3.584L515.968 456.7552 191.9232 132.736c-20.4032-20.4288-51.9168-22.0416-70.3488-3.584-18.432 18.432-16.8448 49.9456 3.584 70.3744l324.0448 324.0448L125.1584 847.5904c-20.4288 20.4288-22.016 51.9168-3.584 70.3744 18.432 18.432 49.9456 16.8448 70.3744-3.584L515.968 590.336l324.0448 324.0448c20.4288 20.4288 51.9168 22.016 70.3744 3.584 18.432-18.432 16.8448-49.9456-3.584-70.3744L582.7584 523.5456z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-shangsheng" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M884.416 404.0064L578.9312 95.1168a61.0304 61.0304 0 0 0-87.0016 0L186.432 404.0064C162.3936 428.3136 177.9072 448 221.0688 448H332.8v486.4h396.8V448h120.1792c42.88 0 58.6624-19.6992 34.6368-43.9936zM332.8 435.1744V435.2v-0.0256zM729.6 435.2v-0.0256V435.2z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-xiajiang" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M186.368 607.2448l305.4848 308.9152a61.0304 61.0304 0 0 0 87.0016 0.0128L884.352 607.232c24.0384-24.3072 8.5248-44.032-34.6368-44.032H742.4V76.8H345.6v486.4h-124.5952c-42.88 0-58.6624 19.7504-34.6368 44.0448zM742.4 576.1152v-0.0256 0.0256z m-396.8-0.0256v0.0256-0.0256z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)