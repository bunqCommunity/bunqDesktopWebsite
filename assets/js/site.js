(function() {
    var downloadButtonWrapper = document.getElementById("download-button-wrapper");

    function isMacintosh() {
        return navigator.platform.indexOf("Mac") > -1;
    }
    function isWindows() {
        return navigator.platform.indexOf("Win") > -1;
    }
    function isLinux() {
        return navigator.platform.indexOf("Linux") > -1;
    }
    function getPlatform() {
        if (isMacintosh()) {
            return "mac";
        } else if (isWindows()) {
            return "windows";
        } else if (isLinux()) {
            return "linux";
        }
        return false;
    }

    var platform = getPlatform();

    function getGithubRelease() {
        var latestUrl = "https://api.github.com/repos/bunqCommunity/bunqDesktop/releases/latest";

        fetch(latestUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                getCommonGithubAssets(data.assets);
            });
    }

    function getCommonGithubAssets(assets) {
        var assetFiltered = {};
        assets.forEach(function(assetInfo) {
            var basicInfo = {
                browser_download_url: assetInfo.browser_download_url,
                download_count: assetInfo.download_count,
                updated_at: assetInfo.updated_at,
                name: assetInfo.name
            };
            if (assetInfo.name.endsWith(".exe")) {
                assetFiltered["windows"] = basicInfo;
            } else if (assetInfo.name.endsWith(".dmg")) {
                assetFiltered["mac"] = basicInfo;
            } else if (assetInfo.name.endsWith("x86_64.AppImage")) {
                assetFiltered["linux"] = basicInfo;
            }
        });

        updateButton(assetFiltered);
    }

    function getDownloadImage(name) {
        switch (name) {
            case "windows":
                return "windows-brands.svg";
            case "linux":
                return "linux-brands.svg";
            case "mac":
                return "apple-brands.svg";
        }
    }

    function addDownloadButton(name, filteredAssets) {
        if (!filteredAssets[name]) return;

        var downloadUrl = filteredAssets[name]["browser_download_url"];

        downloadButtonWrapper.innerHTML += `<a class="os-download-href ${name}" href="${downloadUrl}">
    <button class="download-button">Download <img alt="${name} download logo" 
        src="/assets/icons/${getDownloadImage(name)}" /></button>
</a>`;
    }

    function updateButton(filteredAssets) {
        if (platform) {
            addDownloadButton(platform, filteredAssets);
            filteredAssets[platform] = false;
        }

        addDownloadButton("mac", filteredAssets);
        addDownloadButton("windows", filteredAssets);
        addDownloadButton("linux", filteredAssets);
    }

    function setupScrollmagic() {
        var scrollMagicController = new ScrollMagic.Controller();

        var blockTween1 = TweenLite.to("body", 0.5, {
            backgroundColor: "#ffffff"
        });
        var blockTween2 = TweenLite.to("body", 0.5, {
            backgroundColor: "#2ac56c"
        });
        var blockTween3 = new TweenLite.to("body", 0.5, {
            backgroundColor: "#0e83cd"
        });
        var blockTween4 = new TweenLite.to("body", 0.5, {
            backgroundColor: "#9e54bd"
        });
        var blockTween5 = new TweenLite.to("body", 0.5, {
            backgroundColor: "#30da6a"
        });
        var blockTween6 = new TweenLite.to("body", 0.5, {
            backgroundColor: "#d83b2b"
        });

        var containerScene1 = new ScrollMagic.Scene({
            triggerElement: "#landing"
        }).setTween(blockTween1);

        var containerScene2 = new ScrollMagic.Scene({
            triggerElement: "#welcome"
        }).setTween(blockTween2);

        var containerScene3 = new ScrollMagic.Scene({
            triggerElement: "#features"
        }).setTween(blockTween3);

        var containerScene4 = new ScrollMagic.Scene({
            triggerElement: "#setup"
        }).setTween(blockTween4);

        var containerScene5 = new ScrollMagic.Scene({
            triggerElement: "#downloads"
        }).setTween(blockTween5);

        var containerScene6 = new ScrollMagic.Scene({
            triggerElement: "#contact"
        }).setTween(blockTween6);

        scrollMagicController.addScene([
            containerScene1,
            containerScene2,
            containerScene3,
            containerScene4,
            containerScene5,
            containerScene6
        ]);
    }

    getGithubRelease();
    setupScrollmagic();
})();
