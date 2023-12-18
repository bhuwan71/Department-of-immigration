import React from 'react';
import {
    Box,
    Flex,
    Link,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
} from '@chakra-ui/react';
import { Text} from '@chakra-ui/react';
import { IoIosArrowDown } from "react-icons/io";
const SubNav: React.FC = () => {
    return (
        <Flex
            as="nav"
            align="center"
            wrap="wrap"
            paddingY="0.6rem"
            paddingX="1rem"
            gap="18px"
            bg="#0D6EFD"
            color="white"
        >
            <Box
            >
                <Link href="#">
                    <Text
                        fontSize={14}
                    >Home</Text>
                </Link>

            </Box>
            <Box>
                <Popover>
                    <PopoverTrigger>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: "4px" }}>
                            <Text fontSize={14} variant="" color="white">
                                About Us
                            </Text>
                            <IoIosArrowDown />
                        </Box>
                    </PopoverTrigger>
                    <PopoverContent bg="#0D6EFD" color="white">
                        <PopoverArrow />
                        <PopoverBody>
                            <Flex fontSize={12} direction="column">
                                <Link href="/item1" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                    Item 1
                                </Link>
                                <Link href="/item2" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                    Item 2
                                </Link>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button p="2" variant="unstyled" _hover={{ background: 'white', color: 'blue' }}>
                                            Submenu
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent bg="#0D6EFD" color="white">
                                        <PopoverArrow />
                                        <PopoverBody>
                                            <Flex direction="column">
                                                <Link href="/subitem1" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                                    Subitem 1
                                                </Link>
                                                <Link href="/subitem2" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                                    Subitem 2
                                                </Link>
                                            </Flex>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>

            <Box>
                <Popover>
                    <PopoverTrigger>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: "4px" }}>
                            <Text fontSize={14} variant="" color="white">
                                Visa
                            </Text>
                            <IoIosArrowDown />
                        </Box>
                    </PopoverTrigger>
                    <PopoverContent bg="#0D6EFD" color="white">
                        <PopoverArrow />
                        <PopoverBody>
                            <Flex fontSize={12} direction="column">
                                <Link href="/item1" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                    Item 1
                                </Link>
                                <Link href="/item2" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                    Item 2
                                </Link>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button p="2" variant="unstyled" _hover={{ background: 'white', color: 'blue' }}>
                                            Hello
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent bg="#0D6EFD" color="white">
                                        <PopoverArrow />
                                        <PopoverBody>
                                            <Flex direction="column">
                                                <Link href="/subitem1" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                                    Subitem 1
                                                </Link>
                                                <Link href="/subitem2" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                                    Subitem 2
                                                </Link>
                                            </Flex>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>

            <Box>
                <Popover>
                    <PopoverTrigger>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: "4px" }}>
                            <Text fontSize={14} variant="" color="white">
                                Trekking
                            </Text>
                            <IoIosArrowDown />
                        </Box>
                    </PopoverTrigger>
                    <PopoverContent bg="#0D6EFD" color="white">
                        <PopoverArrow />
                        <PopoverBody>
                            <Flex fontSize={12} direction="column">
                                <Link href="/item1" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                    Item 1
                                </Link>
                                <Link href="/item2" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                    Item 2
                                </Link>
                                <Popover>
                                    <PopoverTrigger>
                                        <Text variant="unstyled" _hover={{ background: 'white', color: 'blue' }}>
                                            Hello
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent bg="#0D6EFD" color="white">
                                        <PopoverArrow />
                                        <PopoverBody>
                                            <Flex direction="column">
                                                <Link href="/subitem1" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                                    Subitem 1
                                                </Link>
                                                <Link href="/subitem2" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                                    Subitem 2
                                                </Link>
                                            </Flex>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>

            <Box>
                <Popover>
                    <PopoverTrigger>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: "4px" }}>
                            <Text fontSize={14} variant="" color="white">
                                Visa Law
                            </Text>
                            <IoIosArrowDown />
                        </Box>
                    </PopoverTrigger>
                    <PopoverContent bg="#0D6EFD" color="white">
                        <PopoverArrow />
                        <PopoverBody>
                            <Flex fontSize={12} direction="column">
                                <Link href="/item1" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                    Item 1
                                </Link>
                                <Link href="/item2" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                    Item 2
                                </Link>
                                <Popover>
                                    <PopoverTrigger>
                                        <Text variant="unstyled" _hover={{ background: 'white', color: 'blue' }}>
                                            Hello
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent bg="#0D6EFD" color="white">
                                        <PopoverArrow />
                                        <PopoverBody>
                                            <Flex direction="column">
                                                <Link href="/subitem1" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                                    Subitem 1
                                                </Link>
                                                <Link href="/subitem2" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                                    Subitem 2
                                                </Link>
                                            </Flex>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>

            <Box>
                <Popover>
                    <PopoverTrigger>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: "4px" }}>
                            <Text fontSize={14} variant="" color="white">
                                Publication
                            </Text>
                            <IoIosArrowDown />
                        </Box>
                    </PopoverTrigger>
                    <PopoverContent bg="#0D6EFD" color="white">
                        <PopoverArrow />
                        <PopoverBody>
                            <Flex fontSize={12} direction="column">
                                <Link href="/item1" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                    Item 1
                                </Link>
                                <Link href="/item2" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                    Item 2
                                </Link>
                                <Popover>
                                    <PopoverTrigger>
                                        <Text variant="unstyled" _hover={{ background: 'white', color: 'blue' }}>
                                            Hello
                                        </Text>
                                    </PopoverTrigger>
                                    <PopoverContent bg="#0D6EFD" color="white">
                                        <PopoverArrow />
                                        <PopoverBody>
                                            <Flex direction="column">
                                                <Link href="/subitem1" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                                    Subitem 1
                                                </Link>
                                                <Link href="/subitem2" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                                    Subitem 2
                                                </Link>
                                            </Flex>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>

            <Link href="#">
                <Text
                    fontSize={14}
                >Citizen Charter</Text>
            </Link>

            <Box>
                <Popover>
                    <PopoverTrigger>
                        <Box style={{ display: 'flex', alignItems: 'center', gap: "4px" }}>
                            <Text fontSize={14} variant="" color="white">
                                Immigration Offices
                            </Text>
                            <IoIosArrowDown />
                        </Box>
                    </PopoverTrigger>
                    <PopoverContent bg="#0D6EFD" color="white">
                        <PopoverArrow />
                        <PopoverBody>
                            <Flex fontSize={12} direction="column">
                                <Link href="/item1" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                    Item 1
                                </Link>
                                <Link href="/item2" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                    Item 2
                                </Link>
                                <Popover>
                                    <PopoverTrigger>
                                        <Button p="2" variant="unstyled" _hover={{ background: 'white', color: 'blue' }}>
                                            Submenu
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent bg="#0D6EFD" color="white">
                                        <PopoverArrow />
                                        <PopoverBody>
                                            <Flex direction="column">
                                                <Link href="/subitem1" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                                    Subitem 1
                                                </Link>
                                                <Link href="/subitem2" p="2" _hover={{ background: 'white', color: 'blue' }}>
                                                    Subitem 2
                                                </Link>
                                            </Flex>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Flex>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>

            <Link href="#">
                <Text
                    fontSize={14}
                >FAQ</Text>
            </Link>

            <Link href="#">
                <Text
                    fontSize={14}
                >Targeted Financial Sanction List</Text>
            </Link>



        </Flex>
    );
};

export default SubNav;
