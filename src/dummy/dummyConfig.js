module.exports = (id, createdBy) => {

    return {
        _id: id,
        __v: 0,
        createdBy: createdBy,
        name: 'Dummy Config #' + id,
        parts: [
            {
                type: 'CPU',
                manufacturer: {
                    name: 'Intel',
                    website: 'https://intel.com'
                },
                model: 'Core i7-9700K',
                specification: 'Octa-Core 3.6 GHz LGA1151',
                technicalParameters: [
                    {
                        name: 'Core count',
                        value: '6'
                    },
                    {
                        name: 'Frequency',
                        value: '2.2 GHz'
                    },
                    {
                        name: 'Socket',
                        value: 'LGA1151'
                    }
                ]
            },
            {
                type: 'MOTHERBOARD',
                manufacturer: {
                    name: 'ASUS',
                    website: 'https://asus.com'
                },
                model: 'TUF Z390-PLUS GAMING',
                specification: 'Intel Z390 LGA1151 DDR4',
                technicalParameters: [
                    {
                        name: 'CPU Socket',
                        value: 'LGA1151'
                    },
                    {
                        name: 'Chipset',
                        value: 'Intel Z390'
                    },
                    {
                        name: 'RAM type',
                        value: 'DDR4'
                    },
                    {
                        name: 'Memory slots',
                        value: '4'
                    },
                    {
                        name: 'PCI-E x16',
                        value: '2'
                    },
                    {
                        name: 'PCI-E x8',
                        value: '-'
                    },
                    {
                        name: 'PCI-E x4',
                        value: '-'
                    },
                    {
                        name: 'PCI-E x1',
                        value: '4'
                    }
                ]
            },
            {
                type: 'RAM',
                manufacturer: {
                    name: 'CORSAIR',
                    website: 'https://corsair.com'
                },
                model: 'Vengeance RGB Pro',
                specification: '32GB DDR4 3200MHz CL16 KIT',
                technicalParameters: [
                    {
                        name: 'Capacity',
                        value: '32 GB'
                    },
                    {
                        name: 'Standard',
                        value: 'DDR4'
                    },
                    {
                        name: 'Frequency',
                        value: '3200 MHz'
                    },
                    {
                        name: 'Latency',
                        value: 'CL16'
                    }
                ]
            },
            {
                type: 'GPU',
                manufacturer: {
                    name: 'NVidia',
                    website: 'https://nvidia.com'
                },
                model: 'GeForce RTX 2080 Ti',
                specification: '11GB GDDR6 352bit',
                technicalParameters: [
                    {
                        name: 'VRAM',
                        value: '11 GB'
                    },
                    {
                        name: 'VRAM Type',
                        value: 'GDDR6'
                    },
                    {
                        name: 'Core Frequency',
                        value: '1350 MHz'
                    },
                    {
                        name: 'Memory Frequency',
                        value: '7000 MHz'
                    },
                    {
                        name: 'Memory Interface Bandwidth',
                        value: '352 bits'
                    }
                ]
            },
            {
                type: 'STORAGE',
                manufacturer: {
                    name: 'Samsung',
                    website: 'https://samsung.com'
                },
                model: '970 EVO Plus',
                specification: '500GB M.2 PCI-E',
                technicalParameters: [
                    {
                        name: 'Capacity',
                        value: '500 GB'
                    },
                    {
                        name: 'Size',
                        value: 'M.2 2280'
                    },
                    {
                        name: 'Connector',
                        value: 'NVMe PCI-E x1'
                    },
                    {
                        name: 'NAND Type',
                        value: 'TLC'
                    },
                    {
                        name: 'Maximum Read Speed',
                        value: '3500 MB/s'
                    },
                    {
                        name: 'Maximum Write Speed',
                        value: '3300 MB/s'
                    }
                ]
            }
        ]
    }

}