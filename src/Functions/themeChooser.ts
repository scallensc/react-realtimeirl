const themeChooser = (input: string, key: string) => {
  const providers: object = {
    Dark: {
      url: `https://tile.jawg.io/b19e8b5f-4bd9-4fe3-a5b5-9d36faf0ff93/{z}/{x}/{y}{r}.png?access-token=${key}`,
      options: {
        attribution:
          '<a href="https://www.jawg.io" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors',
        maxZoom: 20,
      },
    },
    OpenStreetMap: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
      variants: {
        Mapnik: {},
        DE: {
          url: 'https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png',
          options: {
            maxZoom: 18,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
        CH: {
          url: 'https://tile.osm.ch/switzerland/{z}/{x}/{y}.png',
          options: {
            maxZoom: 18,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
        France: {
          url: 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
          options: {
            maxZoom: 20,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
        HOT: {
          url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
          options: {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
        BZH: {
          url: 'https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png',
          options: {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          },
        },
      },
    },
    OPNVKarte: {
      url: 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png',
      options: {
        maxZoom: 18,
        attribution:
          'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <br/>&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    },
    CyclOSM: {
      url: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
      options: {
        maxZoom: 20,
        attribution:
          '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: {attribution.OpenStreetMap}',
      },
    },
    Jawg: {
      url: `https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${key}`,
      options: {
        attribution:
          '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 22,
        subdomains: 'abcd',
        // Get your own Jawg access token here : https://www.jawg.io/lab/
        // NB : this is a demonstration key that comes with no guarantee
      },
      variants: {
        Streets: {
          url: `https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${key}`,
          options: {
            attribution:
              '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            minZoom: 0,
            maxZoom: 22,
            subdomains: 'abcd',
          },
        },
        Terrain: {
          url: `https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=${key}`,
          options: {
            attribution:
              '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            minZoom: 0,
            maxZoom: 22,
            subdomains: 'abcd',
          },
        },
        Sunny: {
          url: `https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=${key}`,
          options: {
            attribution:
              '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            minZoom: 0,
            maxZoom: 22,
            subdomains: 'abcd',
          },
        },
        Dark: {
          url: `https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${key}`,
          options: {
            attribution:
              '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            minZoom: 0,
            maxZoom: 22,
            subdomains: 'abcd',
          },
        },
        Light: {
          url: `https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=${key}`,
          options: {
            attribution:
              '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            minZoom: 0,
            maxZoom: 22,
            subdomains: 'abcd',
          },
        },
        Matrix: {
          url: `https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=${key}`,
          options: {
            attribution:
              '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            minZoom: 0,
            maxZoom: 22,
            subdomains: 'abcd',
          },
        },
      },
    },
    Stamen: {
      url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}',
      options: {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
          '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; <br/>&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        variant: 'toner',
        ext: 'png',
      },
      variants: {
        Toner: {
          url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}',
          options: {
            attribution:
              'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
              '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; <br/>&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            variant: 'toner',
            ext: 'png',
          },
        },
        Watercolor: {
          url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}',
          options: {
            attribution:
              'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
              '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; <br/>&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            subdomains: 'abcd',
            ext: 'jpg',
            variant: 'watercolor',
            minZoom: 1,
            maxZoom: 16,
          },
        },
      },
    },
  };
  let theme = {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    options: {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 20,
    },
    variant: '',
  };
  if (input) {
    const inputArray: Array<string> = input.split('.');
    if (inputArray.length > 1) {
      try {
        theme =
          providers[inputArray[0] as keyof typeof providers]['variants'][
            inputArray[1]
          ];
      } catch (error) {
        return theme;
      }
    } else {
      try {
        theme = providers[inputArray[0] as keyof typeof providers];
        theme.variant = '';
      } catch (error) {
        return theme;
      }
    }
  }
  return theme;
};

export default themeChooser;
