

	// Handles pagination click events by preventing default behavior and updating URL
	// Parameters:
	// t - click event
	// e - clicked link element 
	// i - callback function to handle URL update
	function r(t, e, i) {
		t.preventDefault();
		t.stopPropagation();
		var n = e.attr("href");
		n && i(n.replace(/\?/, ""))
	}

	// Renders pagination controls based on current page state
	// Parameters:
	// t - pagination container element
	// e - current page number 
	// n - number of pages to show
	// r - last page number
	// s - query parameters object
	function s(t, e, n, r, s) {
		// Clear existing pagination
		if (t.empty(),
			// Only show pagination if we have multiple pages
			0 !== n && (1 !== n || 1 !== e || 1 !== r)) {
			// Remove page parameter from query params object if it exists
			"object" == typeof s && delete s.page;
			
			// Convert query params object to URL string if needed
			var o = "object" == typeof s ? function(t) {
				var e = [];
				for (var i in t)
					t.hasOwnProperty(i) && e.push(encodeURIComponent(i) + "=" + encodeURIComponent(t[i]));
				return e.join("&")
			}(s) : s;
			
			console.log("queryParams: " + o + " | currentPage: " + e + " | lastPage: " + r + " | pageCount: " + n);

			// Calculate starting page number for pagination range
			var a = Math.floor(e - n / 2);
			// Ensure start page isn't less than 1
			a < 1 && (a = 1),
			// Adjust start page if range would exceed last page
			a + n - 1 > r && (a = r - n + 1);

			// HTML for ellipsis
			var l = '<li class="disabled PagedList-ellipses"><span>…</span></li>';

			// Add "First Page" link if not starting from page 1
			1 !== a && t.append('<li class="PagedList-skipToFirst"><a href="?' + o + '&page=1">««</a></li>'),
			// Add "Previous Page" link if not on first page
			1 !== e && t.append('<li class="PagedList-previous"><a href="?' + o + "&page=" + (e - 1) + '">«</a></li>'),
			// Add ellipsis if starting after page 1
			1 !== a && t.append(l);

			// Add numbered page links
			for (var c = a; c < a + n; c++)
				// Current page gets special styling
				c === e ? t.append('<li class="pager active"><span>' + [c] + "</span></li>") 
					   : t.append('<li class="pager"><a href="?' + o + "&page=" + [c] + '">' + [c] + "</a></li>");

			// Add ellipsis if more pages exist after range
			a + n < r && t.append(l),
			// Add "Next Page" link if not on last page
			e !== r && t.append('<li class="PagedList-skipToNext"><a href="?' + o + "&page=" + (e + 1) + '">»</a></li>'),
			// Add "Last Page" link if range doesn't reach last page
			a + n < r && t.append('<li class="PagedList-skipToLast"><a href="?' + o + "&page=" + r + '">»»</a></li>');

			// Scroll to pagination container
			var d = t.parents(".js-pageContainer").length > 0 ? t.parents(".js-pageContainer") : t;
			i()("html, body").animate({
				scrollTop: d.offset().top - 80
			}, 500)
		}
	}

	// Matches heights of elements with class 'height-item' using matchHeight plugin
	function o() {
		i()((function() {
			i()(".height-item").matchHeight({
				byRow: !0,
				property: "height",
				target: null,
				remove: !1
			})
		}))
	}

	// Makes AJAX requests with loading state management
	// Parameters:
	// t - URL to request
	// e - HTTP method (GET, POST etc)
	// n - data payload
	// r - callback function for response
	function a(t, e, n, r) {
		// Add loading state
		document.documentElement.classList.add("is-loading");
		
		// Make AJAX request with language header
		i().ajax({
			url: t,
			type: e,
			dataType: "json",
			data: n,
			headers: {
				"Accept-Language": document.documentElement.getAttribute("lang")
			}
		})
		.done((function(t) {
			r(t)
		}))
		.fail((function(t, e, i) {
			r(t.status)
		}))
		.always((function() {
			// Remove loading state when complete
			document.documentElement.classList.remove("is-loading")
		}))
	}

	window.onload = function() {
		i()(".long-options select").each((function() {
			console.log(this);
			i()(this).append("<optgroup label=''></optgroup>")
		})),
		i()(window).width() > 667 && o()
	}
	,
	i()(document).ready((function() {
		i()("a.back").click((function() {
			return parent.history.back(),
			!1
		}))
	})),
	i()((function() {
		// Initialize content listing functionality when document is ready
		i()(".ContentListingBlock").each((function() {
			// Cache DOM elements and initialize variables
			var t, // Stores filter data
				e = i()(this).find(".ContentListingBlock-filter").find(".selecter"), // Filter dropdown
				n = i()(this).find(".js-ContentListingBlock-wrapper > .row"), // Content container
				l = i()(this).find(".querystring").attr("id"), // Query string ID
				c = i()(this).find(".error"), // Error message element
				d = [], // Array for storing data
				u = "/api/contentlisting", // API endpoint
				h = i()(this).find(".pagination-container"), // Pagination container
				f = i()(this).find("ul.pagination"); // Pagination element

			// Function to process and display content items
			function p(t, e, n, r) {
				// Make AJAX request to get content
				a(t, "GET", e, (function(t) {
					// Handle 404 error
					if (404 === t)
						return c.removeClass("d-none"),
						void h.hide();
					
					// Show content container and hide error
					c.addClass("d-none"),
					h.show(),

					// Process each result item
					i().each(t.results, (function(t, e) {
						// Extract data from result object
						var i, n, r, s, 
							a = e.type,
							l = e.month,
							c = e.day,
							d = e.year,
							u = e.url,
							h = e.imageUrl,
							f = e.title,
							p = e.description || "",
							g = e.linkText,
							y = (e.eventOccursInPast ? "is-archived" : "") || "",
							b = e.displayDate,
							_ = e.displayLocation,
							w = e.displayTime,
							x = e.supportingMaterials || "";

						// Define HTML templates for different content types
						i = '<div class="ContentListing-news">...</div>', // News template
						n = '<div class="ContentListing-operation row">...</div>', // Operations template
						r = '<div class="ContentListing-stories">...</div>', // Stories template
						s = '<div class="ContentListing-events">...</div>', // Events template

						// Render appropriate template based on content type
						switch (a) {
							case "news":
								m(i);
								break;
							case "operations":
							default:
								m(n);
								break;
							case "stories":
								m(r, !0),
								o(); // Match heights for stories
								break;
							case "events":
								m(s, !0)
						}
					}))
				}))
			}
		}))
	})),



	n(7047);
	i()((function() {
		i()(".DocumentFilterBlock").each((function() {
			var t, e = i()(this).find(".DocumentFilterBlock-select"), n = i()(this).find(".DocumentFilterBlock-assets .row");
			i()(this).removeClass().addClass("DocumentFilterBlock"),
			e.on("change.select", (function(e) {
				e.preventDefault();
				var r = e.target.id
					, s = e.target.value;
				t = {
					currentBlockId: r,
					filterValue: s
				},
				n.fadeOut(250, (function() {
					i()(this).empty().show()
				}))
			}))
		}))
	})),






	i()(document).ready((function() {
		var t = "is-active";
		function e() {
			return window.innerWidth < 1200
		}
		var n = document.querySelectorAll(".Link-down-arrow-md");
		function r(t) {
			null != t ? i()("a.toggle-anchor").toggleClass("close-toggle", {
				hide: !1,
				show: !0
			}[t]) : i()("a.toggle-anchor").toggleClass("close-toggle"),
			i()(".Search-form").animate({
				width: t || "toggle"
			}, 350),
			i()(".main-nav-form").focus()
		}
		!function() {
			for (var s = 0; s < n.length; s++)
				n[s].addEventListener("click", (function(e) {
					e.preventDefault(),
					this.classList.contains(t) ? a() : (a(),
					this.classList.add(t))
				}))
			var o = i()(".Nav-menu");
			function a() {
				for (var e = 0; e < n.length; e++)
					n[e].classList.remove(t)
			}
			i()(document).mouseup((function(t) {
				o.is(t.target) || 0 !== o.has(t.target).length || i()(".modal-video").length || a()
			})).scroll((function() {
				e() || r("hide"),
				i()("#siteSearchForm .autocomplete").autocomplete("close"),
				i()(".Nav-primary-link.is-active").length && a()
			}));
			var l = document.querySelectorAll(".has-submenu");
			document.querySelector(".Nav-menu-button").addEventListener("click", (function(e) {
				this.classList.toggle(t);
				var i = this.getAttribute("aria-expanded");
				this.setAttribute("aria-expanded", !JSON.parse(i))
			})),
			function() {
				for (var i = 0; i < l.length; i++)
					l[i].addEventListener("click", (function(i) {
						e() && (i.preventDefault(),
						this.classList.toggle(t))
					}))
			}()
		}(),
		i()(".LanguageSelector-md").on("change", (function() {
			document.location.href = i()(".LanguageSelector-md option:selected").attr("data-reload")
		})),
		i()(window).resize((function() {
			i()(".Search-form:hidden") && i()(window).width() < 1200 ? r("show") : r("hide")
		})),
		i()(".animation").on("click", (function() {
			i()(".animation").toggleClass("cross")
		})),
		i()("a.toggle-anchor").on("click", (function(t) {
			t.preventDefault(),
			r()
		}))
	})),

	
	
	// Handles AJAX updates for document filtering
	// Parameters:
	// t - target element to update
	// e - URL to fetch content from 
	function l(t, e) {
		$.ajax({
			url: e,
			success: function(e) {
				$(t).html(e);
				o(); // Match heights after content update
			}
		})
	}

	// Builds query string from form elements
	// Parameters:
	// t - form container element
	// e - base URL
	function c(t, e) {
		var i = e
			, n = $(t).find(".querystring");
		if (n && n.length > 0) {
			var r = [];
			n.each((function() {
				var t = $(this).attr("name") + "=" + $(this).val();
				r.push(t)
			}));
			var s = r.join("&")
				, o = i.indexOf("?") >= 0 ? "&" : "?";
			i = i + o + s
		}
		return i
	}



	
	$(document).ready((function() {
		// Handle clicks on elements with class 'ajaxupdatetrigger'
		$(".ajaxupdatetrigger").click((function(t) {
			t.preventDefault();
			// Find the closest container element
			var e = $(this).parents("div.ajaxupdatepanelcontainer");
			if (e && e.length > 0) {
				var i = e[0]
					, n = $(i).find("div.ajaxupdatepanel");
				if (n && n.length > 0) {
					// Get the URL from href or resource attribute
					var r = $(this).attr("href");
					if (r || (r = $(this).attr("resource")),
					r) {
						// Build query string and make AJAX request
						r = c(e, r),
						l(n[0], r);
						// Update active state of list items
						var s = $(this).parents("ul");
						$(s).find("li").each((function() {
							$(this).removeClass()
						}));
						var o = $(this).parents("li");
						$(o).addClass("active")
					}
				}
			}
		})),

		// Handle pagination clicks within ajaxupdatepanel
		$("body").on("click", "div.ajaxupdatepanel .pagination a", (function(t) {
			t.preventDefault();
			var e = $(this).parents("div.ajaxupdatepanelcontainer");
			if (e && e.length > 0) {
				var i = e[0]
					, n = $(i).find("div.ajaxupdatepanel");
				if (n && n.length > 0) {
					var r = $(this).attr("href");
					// Make AJAX request with pagination URL
					r && (r = c(e, r),
					l(n[0], r))
				}
			}
		})),

		// Initialize elements with class 'ajaxupdatetriggerwhenselected'
		$(".ajaxupdatetriggerwhenselected").each((function() {
			var t = $(this).parents("div.ajaxupdatepanelcontainer");
			if (t && t.length > 0) {
				var e = t[0]
					, i = $(e).find("div.ajaxupdatepanel");
				if (i && i.length > 0) {
					var n = $(this).attr("resource");
					// Make initial AJAX request if resource URL exists
					n && (n = c(t, n),
					l(i[0], n))
				}
			}
		})),

		// Handle change events on elements with class 'ajaxupdatetriggerwhenselected'
		$(".ajaxupdatetriggerwhenselected").change((function(t) {
			t.preventDefault();
			var e = $(this).parents("div.ajaxupdatepanelcontainer");
			if (e && e.length > 0) {
				var i = e[0]
					, n = $(i).find("div.ajaxupdatepanel");
				if (n && n.length > 0) {
					var r = $(this).attr("resource");
					// Make AJAX request when selection changes
					r && (r = c(e, r),
					l(n[0], r))
				}
			}
		}))
	})),

	// Global function to handle month dropdown updates
	window.ajaxcallpartialupdatequeryStringabcdefg = function(t, e, i) {
		var n = $(t).parents("div.ajaxupdatepanelcontainer");
		if (n && n.length > 0) {
			var r = $(n).find("#month");
			if (r) {
				// Store current month selection
				var s = $(r).val()
					, a = "/api/DropDownListApi/GetAnnouncementDropDownListMonth/?type=" + e + "&language=" + i;
				a = c(n, a),
				// Make AJAX request to update month dropdown
				$.ajax({
					url: a,
					success: function(t) {
						// Clear existing options
						$(r).empty(),
						// Add new options from response
						$.each(t, (function(t, e) {
							$(r).append('<option value="' + e.value + '">' + e.text + "</option>"),
							o()
						})),
						// Restore previous selection if still valid, otherwise select default
						$(r).children("option").filter((function(t, e) {
							return e.value == s
						})).length > 0 ? $(r).val(s) : $(r).val(0),
						null != $(r).selectedIndex && ($(r).selectedIndex = 0)
					}
				})
			}
		}
	};



// Initialize search functionality when document is ready
i()((function() {
    // Only proceed if search filters are present
    if (document.getElementById("has-search-filters")) {
        // Cache DOM elements
        var t = i()(".search"),
            e = i()(".SearchForm"),
            n = e.find(".SearchForm-filter").find(".selecter"),
            o = t.find(".searchResults"),
            l = location.pathname,
            c = i()(".searchResult-counter"),
            d = window.TRANSLATIONS.search,
            u = i()(".relatedQueries > p.Heading--h6"),
            h = i()(".SearchForm-textbox input").val();

        // Cache pagination elements    
        var f, p = i()(this).find(".pagination-container"), 
            g = i()(this).find("ul.pagination");

        // Initialize browser history state
        (f = location.search).replace(/\?/, ""),
        window.history.replaceState(f, "", f),

        // Handle pagination clicks
        g.off("click.pager", "a").on("click.pager", "a", (function(t) {
            r(t, i()(this), (function(t) {
                g.empty(),
                b(t), // Update URL
                v(l, t) // Load new results
            })
        })),

        // Handle related query clicks
        u.off("click.relatedQuery", "a").on("click.relatedQuery", "a", (function(t) {
            t.preventDefault();
            var e = i()(this).attr("href").substring(1);
            b(e), // Update URL
            i()(".SearchForm-textbox input").val(e.substring(2)),
            y(), // Reset filters
            v(l, e) // Load new results
        })),

        // Handle filter changes
        n.off("change").on("change", (function(t) {
            e.trigger("submit.loadSearchResults"),
            n.select2()
        })),

        // Handle browser back/forward
        window.onpopstate = function(t) {
            var e = t.state.replace(/\?/, ""),
                r = m(e); // Parse query params
            
            // Restore search input
            i()('[name="q"]').val(r.q),
            
            // Restore filter selection
            if (void 0 === r.filters) {
                var s = n.find("option").eq(0).val();
                n.val(s)
            } else
                n.val(r.filters);
            
            n.select2(),
            v(l, e) // Load results for restored state
        },

        // Handle search form submission
        e.on("submit.loadSearchResults", (function(t) {
            t.preventDefault(),
            y(); // Reset filters if search term changed
            var e = i()(this).serialize();
            return v(l, e), // Load results
            b(e), // Update URL
            !1
        }))
    }

    // Helper function to parse query string into object
    function m(t) {
        return t.split("&").reduce((function(t, e, i, n) {
            var r = e.split("=");
            return t[decodeURIComponent(r[0])] = decodeURIComponent(r[1]),
            t
        }), {})
    }

    // Main function to load and render search results
    function v(t, e) {
        // ... rest of the function implementation ...
    }

    // Reset filters when search term changes
    function y() {
        if (h !== i()(".SearchForm-textbox input").val()) {
            h = i()(".SearchForm-textbox input").val(),
            i()(".SearchForm-filter select option:eq(0)").prop("selected", !0),
            i()(".SearchForm-filter select").select2()
        }
    }

    // Update browser URL with new search params
    function b(t) {
        var e = "?" + t;
        window.history.pushState(e, "", e)
    }

    // Append new search result to results container
    function _(t) {
        o.fadeIn(250, (function() {
            i()(this).append(t)
        }))
    }
}))



	n(4642);
	function d() {
		"true" == $("#hHideLoadMore").val() ? $("#btnLoadMoreArchive").hide() : $("#btnLoadMoreArchive").show()
	}
	function u() {
		"true" == $("#hHideLoadMore").val() ? $("#btnLoadMoreKeyword").hide() : $("#btnLoadMoreKeyword").show()
	}
	$(document).ready((function() {
		$("#StorieCategories").change((function() {
			var t;
			t = $(this).val(),
			$.ajax({
				url: "/StoriesArchivePage/FilterArchivedStories",
				data: {
					selectedStoryCategory: t,
					storiesNumberToDisplay: $("#hStoriesNumberToDisplay").val()
				},
				success: function(t) {
					$(".divArchived").html(t),
					d(),
					o()
				}
			})
		})),
		d(),
		$("#btnLoadMoreArchive").click((function() {
			var t;
			t = $("#StorieCategories").val(),
			$("#hScrollCurrent").val($(document).scrollTop()),
			$.ajax({
				url: "/StoriesArchivePage/LoadMoreStories",
				data: {
					PagesResultCount: $(".hPagesResultCount").val(),
					selectedStoryCategory: t,
					moreStoriesNumber: $("#hMoreStoriesNumber").val()
				},
				success: function(t) {
					$(".divArchived").html(t),
					$(document).scrollTop($("#hScrollCurrent").val()),
					d(),
					o()
				}
			})
		}))
	})),
	$(document).ready((function() {
		u(),
		$("#btnLoadMoreKeyword").click((function() {
			var t;
			t = $("#hKeyword").val(),
			$("#hScrollCurrent").val($(document).scrollTop()),
			$.ajax({
				url: "/StoriesKeywordLanderPage/LoadMoreStories",
				data: {
					PagesResultCount: $(".hPagesResultCount").val(),
					keyword: t,
					moreStoriesNumber: $("#hMoreStoriesNumber").val()
				},
				success: function(t) {
					$(".divArchived").html(t),
					$(document).scrollTop($("#hScrollCurrent").val()),
					u(),
					o()
				}
			})
		}))
	})),
	n(5847),
	n(4368),
	n(5692),
	n(2839),
	n(7685);
	i()(document).ready((function() {
		i()("select:not(.sg-input)").select2({
			minimumResultsForSearch: 20
		})
	})),
	var h = n(5733)
		, f = n.n(h)
		, p = n(925)
		, g = n.n(p)
		, m = n(3162);
	i()(document).ready((function() {
		for (var t = document.getElementsByTagName("input"), e = 0; e < t.length; e++)
			"checkbox" == t[e].type && (t[e].checked = !1)
	})),
	i()(":checkbox").on("click", (function() {
		i()(this).parent().parent().toggleClass("checked")
	})),
	jQuery((function(t) {
		var e = window.Promise;
		
		// Clear result message
		function i() {
			t("#result").removeClass().text("")
		}
		
		// Show success message
		function n(e) {
			i(),
			t("#result").addClass("alert alert-success").text(e)
		}
		
		// Show error message 
		function r(e) {
			i(),
			t("#result").addClass("alert alert-danger").text(e)
		}

		// Check for Promise and Blob support
		if (e || (e = f().external.Promise),
		f().support.blob)
			// Handle download form submission
			t(".download_form").on("submit", (function() {
				i();
				var s = new (f()); // Create new zip file
				
				// Add each checked file to zip
				return t(this).find(":checked").each((function() {
					var i = t(this).data("url")
						, n = i.replace(/.*\//g, "");
					s.file(n, function(t) {
						return new e((function(e, i) {
							g().getBinaryContent(t, (function(t, n) {
								t ? i(t) : e(n)
							})
						}))
					}(i), {
						binary: !0
					})
				}
				)),

				// Generate zip file with progress tracking
				s.generateAsync({
					type: "blob"
				}, (function(e) {
					var i, r = "progression : " + e.percent.toFixed(2) + " %";
					e.currentFile && (r += ", current file = " + e.currentFile),
					n(r),
					i = 0 | e.percent,
					t("#progress_bar").removeClass("hide").find(".progress-bar").attr("aria-valuenow", i).css({
						width: i + "%"
					})
				})).then((function(t) {
					// Save zip file when complete
					(0,
					m.saveAs)(t, "transcanada.zip"),
					n("done !")
				}), (function(t) {
					r(t)
				})),
				!1
			}
			)),
		else
			r("This demo works only with a recent browser !")
	})),
	n(3365);
	i()(document).ready((function() {
		i()("#slickCarousel").slick({
			centerMode: !0,
			centerPadding: "0",
			slidesToShow: 3,
			dots: !0,
			responsive: [{
				breakpoint: 1024,
				settings: {
					arrows: !1,
					centerMode: !0,
					centerPadding: "40px",
					slidesToShow: 1
				}
			}, {
				breakpoint: 480,
				settings: {
					arrows: !1,
					centerMode: !0,
					centerPadding: "5px",
					slidesToShow: 1
				}
			}]
		})
	})),
	i()(document).ready((function() {
		var t = i()(".secondary-nav").length;
		i()(".autocomplete").autocomplete({
			// Make AJAX call to get search suggestions
			source: function(t, e) {
				i().ajax({
					url: "/api/search/autocomplete/?",
					data: {
						input: t.term
					},
					success: function(t) {
						var n = i().map(t.Hits, (function(t) {
							return {
								label: t.Query,
								id: t.Query
							}
						}));
						e(n)
					}
				})
			},
			minLength: 1,
			delay: 300,
			
			// Position and style autocomplete dropdown
			open: function(t, e) {
				var n = i()(".SearchForm input").outerWidth() + i()(".searchButton").outerWidth();
				navigator.userAgent.match(/(iPod|iPhone|iPad)/) && i()(".ui-autocomplete").off("menufocus hover mouseover mouseenter"),
				i()(".ui-autocomplete:eq(1)").css({
					top: "+=9"
				}),
				i()(window).width() > 990 && i()(".SearchForm input").autocomplete("widget").width(n - 13)
			},
			
			// Handle selection of autocomplete suggestion
			select: function(t, e) {
				i()(this).val(e.item.value),
				i()(this).closest("form").submit()
			}
		}),
		
		// Ensure autocomplete appears above other elements
		t && i()("ul.ui-autocomplete").each((function() {
			this.style.setProperty("z-index", "1000", "important")
		}))
	})),
	n(1995);
	[...document.querySelectorAll('[data-bs-toggle="popover"]')].map((e => new t.Popover(e))),
	[...document.querySelectorAll('[data-bs-toggle="tooltip"]')].map((e => new t.Tooltip(e)))
}()