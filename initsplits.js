Split(['#sidebar', '#main', '#sidebar2'],
{
    minSize: [100, 100, 100],
    sizes: [20, 60, 20]
});
Split(['#frame', '#text'],
{
    minSize: [10, 10],
    sizes: [60, 40],
    direction: 'vertical',
    gutterSize: 20,
    cursor: 'pointer'
});
